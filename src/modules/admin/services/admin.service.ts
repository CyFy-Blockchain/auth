import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { strings } from '@app/constants/strings';
import { UsersService } from '@app/modules/users/services/users.service';
import {
  AdminLoginRequest,
  RecoverPasswordRequest,
  RecoverPasswordResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from '../dto/admin.dto';
import { AxiosService } from '@app/modules/shared/axios.service';
import { mapUserToUserDto } from '@app/modules/users/dto/users.mapper';
import { UserDto } from '@app/modules/users/dto/users.dto';
import { UserRole } from '@app/modules/users/dto/users.enum';
import { AuthMappingService } from '@app/modules/authMapping/services/authMapping.services';
import { envVar } from '@app/config/env/default';
import { CipherService } from '@app/modules/shared/cipher.service';
import { generateString } from '@app/utils/helper';

const recoverableKey = envVar.server.recoverable_encryption_key;
@Injectable()
export class AdminService {
  constructor(
    private userService: UsersService,
    private axiosService: AxiosService,
    private authMappingService: AuthMappingService,
    private cipherService: CipherService,
  ) {}

  async adminLogin(user: AdminLoginRequest): Promise<UserDto> {
    // check if user exists
    const userDb = await this.userService.fetchOrgUser(
      user.username,
      user.orgName,
    );
    if (userDb) {
      throw new HttpException(
        strings.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    // fetch admin creds from blockchain
    const response = await this.axiosService.post('/api/v1/auth/enroll', user);

    // add user in DB
    const savedUser = await this.userService.addUserInDb({
      username: user.username,
      password: user.password,
      orgName: user.orgName,
      privateKey: response.privateKey,
      publicKey: response.publicKey,
      userRole: UserRole.Admin,
      position: 'Super Admin',
      deptName: 'Admins',
    });

    return mapUserToUserDto(savedUser);
  }

  async registerUser(user: RegisterUserRequest): Promise<RegisterUserResponse> {
    // check if the token belongs to the admin
    const tokenUser = await this.authMappingService.fetchUserByAuthUUID(
      user.token,
    );
    if (!tokenUser || tokenUser.organization.name !== user.orgName) {
      throw new HttpException(strings.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    // check if the username already exists
    const userDb = await this.userService.fetchOrgUser(
      user.username,
      user.orgName,
    );
    if (userDb) {
      throw new HttpException(strings.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    // convert Auth UUID to Fabric UUID
    const fabricUUID = await this.authMappingService.fetchFabricUserUUID(
      user.token,
    );

    // POST Fabric to create account on HLF
    const registerBody = {
      username: user.username,
      orgName: user.orgName,
      role: user.userRole,
      // certMetadata is added in the user's certificate. It defines the user's rights, and roles on a contract
      // Fabric expects a comma separated metadata string
      certMetadata: user.position + ',' + user.deptName,
      attr: user.attr,
    };
    const response = await this.axiosService.post(
      '/api/v1/auth/signup',
      registerBody,
      {
        headers: { authorization: fabricUUID },
      },
    );

    // save user to DB
    await this.userService.addUserInDb({
      username: user.username,
      orgName: user.orgName,
      password: response.secret,
      privateKey: response.privateKey,
      publicKey: response.publicKey,
      userRole: user.userRole,
      position: user.position,
      deptName: user.deptName,
    });

    // respond with secret
    return { secret: response.secret };
  }

  async recoverUserPassword(
    body: RecoverPasswordRequest,
  ): Promise<RecoverPasswordResponse> {
    const userPki = await this.userService.fetchOrgUser(
      body.username,
      body.orgName,
    );
    if (!userPki) {
      throw new HttpException(strings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const secret = generateString();

    const decryptedKey = this.cipherService.decrypt(
      userPki.recoverableKey,
      recoverableKey,
    );
    userPki.privateKey = this.cipherService.encrypt(decryptedKey, secret);

    return { secret };
  }
}

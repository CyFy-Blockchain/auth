import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { strings } from '@app/constants/strings';
import { UsersService } from '@app/modules/users/services/users.service';
import {
  AdminLoginRequest,
  RecoverPasswordRequest,
  RecoverPasswordResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from '@app/modules/admin/dto/admin.dto';
import { AxiosService } from '@app/modules/shared/axios.service';
import { mapUserToUserDto } from '@app/modules/users/dto/users.mapper';
import { AuthenticatedUser, UserDto } from '@app/modules/users/dto/users.dto';
import { UserRole } from '@app/modules/users/dto/users.enum';
import { envVar } from '@app/config/env/default';
import { CipherService } from '@app/modules/shared/cipher.service';
import { generateString } from '@app/utils/helper';

const recoverableKey = envVar.server.recoverable_encryption_key;
@Injectable()
export class AdminService {
  constructor(
    private userService: UsersService,
    private axiosService: AxiosService,
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

  async registerUser(
    newUser: RegisterUserRequest,
    caller: AuthenticatedUser,
  ): Promise<RegisterUserResponse> {
    // caller can only register users in his own organization
    const orgName = caller.organization.name;

    // check if the username already exists
    const userDb = await this.userService.fetchOrgUser(
      newUser.username,
      orgName,
    );
    if (userDb) {
      throw new HttpException(strings.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    // POST Fabric to create account on HLF
    const registerBody = {
      username: newUser.username,
      orgName: orgName,
      role: newUser.userRole,
      // certMetadata is added in the user's certificate. It defines the user's rights, and roles on a contract
      // Fabric expects a comma separated metadata string
      certMetadata: newUser.position + ',' + newUser.deptName,
      attr: newUser.attr,
    };
    const response = await this.axiosService.post(
      '/api/v1/auth/signup',
      registerBody,
      {
        headers: { authorization: caller.fabricUuid },
      },
    );

    // save user to DB
    await this.userService.addUserInDb({
      username: newUser.username,
      orgName: orgName,
      password: response.secret,
      privateKey: response.privateKey,
      publicKey: response.publicKey,
      userRole: newUser.userRole,
      position: newUser.position,
      deptName: newUser.deptName,
    });

    // respond with secret
    return { secret: response.secret };
  }

  async recoverUserPassword(
    body: RecoverPasswordRequest,
    caller: AuthenticatedUser,
  ): Promise<RecoverPasswordResponse> {
    // caller can only recover password for the accounts in his own organisation
    const orgName = caller.organization.name;

    // fetch the PKI for the user in body
    const userPki = await this.userService.fetchOrgUser(body.username, orgName);
    if (!userPki) {
      throw new HttpException(strings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    // replace the password with the random string generated
    const secret = generateString();

    const decryptedKey = this.cipherService.decrypt(
      userPki.recoverableKey,
      recoverableKey,
    );
    userPki.privateKey = this.cipherService.encrypt(decryptedKey, secret);

    return { secret };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@app/constants/strings';
import { User } from '../entities/users.entity';
import {
  SigninUserRequest,
  SigninUserResponse,
  CreateUser,
  UserPki,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '../dto/users.dto';
import { CipherService } from '@app/modules/shared/cipher.service';
import { AuthMappingService } from '@app/modules/authMapping/services/authMapping.services';
import { AxiosService } from '@app/modules/shared/axios.service';
import { OrgsService } from '@app/modules/orgs/services/orgs.service';
// import { envVar } from '@app/config/env/default';

// const encKey = envVar.server.recoverable_encryption_key;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cipherService: CipherService,
    private authMappingService: AuthMappingService,
    private axiosService: AxiosService,
    private orgService: OrgsService,
  ) {}

  private async fetchUserPki(
    userId: string,
    orgName: string,
    password: string,
  ): Promise<UserPki> {
    const user = await this.fetchOrgUser(userId, orgName);
    if (!user)
      throw new HttpException(strings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    try {
      return {
        user: user,
        pki: {
          publicKey: user.publicKey,
          privateKey: this.cipherService.decrypt(user.privateKey, password),
          orgName,
        },
      };
    } catch (err) {
      throw new HttpException(
        strings.USER_INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async fetchOrgUser(username: string, orgName: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        username: username,
        department: { organisation: { name: orgName } },
      },
    });
  }

  /**
   * Adds a new user to the system.
   *
   * @param user - The user object to be added.
   * @returns The newly added user.
   */
  async addUserInDb(user: CreateUser): Promise<User> {
    throw new Error('This function is yet to be implemented');
    // const org = await this.orgService.fetchOrg(user.deptId);

    // return await this.usersRepository.save(
    //   this.usersRepository.create({
    //     username: user.username,
    //     privateKey: this.cipherService.encrypt(user.privateKey, user.password),
    //     recoverableKey: this.cipherService.encrypt(user.privateKey, encKey),
    //     publicKey: user.publicKey,
    //     organization: org,
    //     userRole: user.userRole,
    //     department: new Department
    //   }),
    // );
  }

  async signinUser(user: SigninUserRequest): Promise<SigninUserResponse> {
    // fetch user PKI from DB
    const { pki: userPki, user: userDb } = await this.fetchUserPki(
      user.username,
      user.orgName,
      user.password,
    );

    // create wallet on Blockchain using userPki
    const response = await this.axiosService.post(
      '/api/v1/auth/login',
      userPki,
    );
    const fabricUUID = response.userId;

    // generate UUID and store it against wallet UUID
    const authMap = await this.authMappingService.addFabricUserUuid(
      fabricUUID,
      userDb,
    );

    return { token: authMap.authUserUuid, refreshToken: authMap.refreshUuid };
  }

  async updatePassword(
    body: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> {
    const user = await this.fetchOrgUser(body.username, body.orgName);
    if (!user) {
      throw new HttpException(strings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const { pki } = await this.fetchUserPki(
      body.username,
      body.orgName,
      body.oldPassword,
    );

    await this.usersRepository.update(
      { id: user.id },
      {
        privateKey: this.cipherService.encrypt(
          pki.privateKey,
          body.newPassword,
        ),
      },
    );

    return { message: strings.PASSWORD_UPDATED };
  }
}

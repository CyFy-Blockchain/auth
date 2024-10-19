import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@app/constants/strings';
import { User } from '../entities/users.entity';
import {
  SigninUserRequest,
  SigninUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  CreateUser,
  UserPki,
  AdminLoginRequest,
} from '../dto/users.dto';
import { CipherService } from '@app/modules/shared/cipher.service';
import { AuthMappingService } from '@app/modules/authMapping/services/authMapping.services';
import { AxiosService } from '@app/modules/shared/axios.service';
import { OrgsService } from '@app/modules/orgs/services/orgs.service';

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

  /**
   * Finds a user by their unique identifier (username).
   *
   * @param userId - The unique identifier of the user to find.
   * @returns The found user.
   * @throws HttpException - If the user is not found.
   */
  private async fetchUserPki(
    userId: string,
    orgName: string,
    password: string,
  ): Promise<UserPki> {
    const user = await this.usersRepository.findOne({
      where: { username: userId, organization: { name: orgName } },
    });
    if (!user)
      throw new HttpException(strings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    try {
      return {
        publicKey: user.publicKey,
        privateKey: this.cipherService.decrypt(user.privateKey, password),
        orgName,
      };
    } catch (err) {
      throw new HttpException(
        strings.USER_INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Adds a new user to the system.
   *
   * @param user - The user object to be added.
   * @returns The newly added user.
   */
  async addUserInDb(user: CreateUser): Promise<User> {
    const org = await this.orgService.fetchOrg(user.orgName);

    return await this.usersRepository.save(
      this.usersRepository.create({
        username: user.username,
        privateKey: this.cipherService.encrypt(user.privateKey, user.password),
        publicKey: user.publicKey,
        organization: org,
        isAdmin: false,
      }),
    );
  }

  async signinUser(user: SigninUserRequest): Promise<SigninUserResponse> {
    // fetch user PKI from DB
    const userPki = await this.fetchUserPki(
      user.username,
      user.orgName,
      user.password,
    );
    console.log('🚀 ~ UsersService ~ signinUser ~ userPki:', userPki);

    // create wallet on Blockchain using userPki
    const response = await this.axiosService.post(
      '/api/v1/auth/login',
      userPki,
    );
    const fabricUUID = response.userId;

    // generate UUID and store it against wallet UUID
    const authUUID = await this.authMappingService.addFabricUserUuid(
      fabricUUID,
    );

    return { token: authUUID.id }; // replace with actual JWT token
  }

  async registerUser(user: RegisterUserRequest): Promise<RegisterUserResponse> {
    // check if the username already exists
    const userDb = await this.usersRepository.findOne({
      where: { username: user.username },
    });
    if (userDb) {
      throw new HttpException(strings.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    // convert Auth UUID to Fabric UUID
    const fabricUUID = await this.authMappingService.fetchFabricUserUUID(
      user.token,
    );
    console.log('🚀 ~ UsersService ~ registerUser ~ fabricUUID:', fabricUUID);

    // POST Fabric to create account on HLF
    const registerBody = {
      username: user.username,
      orgName: user.orgName,
    };
    const response = await this.axiosService.post(
      '/api/v1/auth/signup',
      registerBody,
      {
        headers: { authorization: fabricUUID },
      },
    );

    // save user to DB
    await this.addUserInDb({
      username: user.username,
      orgName: user.orgName,
      password: response.secret,
      privateKey: response.privateKey,
      publicKey: response.publicKey,
    });

    // respond with secret
    return { secret: response.secret };
  }

  async adminLogin(user: AdminLoginRequest): Promise<User> {
    // fetch admin creds from blockchain
    const response = await this.axiosService.post('/api/v1/auth/enroll', user);
    console.log('🚀 ~ UsersService ~ adminLogin ~ response:', response);

    // check if user exists
    const userDb = await this.usersRepository.findOneBy({
      username: user.username,
      organization: { name: user.orgName },
    });
    if (userDb) {
      await this.usersRepository.update(
        { id: userDb.id },
        {
          privateKey: this.cipherService.encrypt(
            response.privateKey,
            user.password,
          ),
          publicKey: response.publickKey,
        },
      );
      return this.usersRepository.findOneBy({ id: userDb.id });
    }

    return await this.addUserInDb({
      username: user.username,
      password: user.password,
      orgName: user.orgName,
      privateKey: response.privateKey,
      publicKey: response.publickKey,
    });
  }
}

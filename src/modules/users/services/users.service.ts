import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@constants/strings';
import { CipherService } from '@baseModules/shared/cipher.service';

import { User } from '@baseModules/users/entities/users.entity';
import {
  UserCredentials,
  UserRegistration,
} from '@baseModules/users/dto/userCreds.dto';
import { DeptService } from '@baseModules/departments/services/depts.services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cipherService: CipherService,
    private deptService: DeptService,
  ) {}

  async loginUser(body: UserCredentials) {
    // fetch user from DB
    const user = await this.usersRepository.findOne({
      where: { username: body.username, departments: { id: body.department } },
    });
    if (!user) {
      throw new HttpException(strings.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    try {
      // decrypt the user private key
      this.cipherService.decrypt(body.password, user.privateKey);

      // return the user object
      return user;
    } catch (error) {
      // throw exception in case of bad decrypt
      throw new HttpException(
        strings.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Adds a new user to the system.
   *
   * @param body - The user object to be added.
   * @returns The newly added user.
   */
  async addUser(body: UserRegistration): Promise<User> {
    // check if user already exists in DB
    const user = await this.usersRepository.findOne({
      where: { username: body.username, departments: { id: body.department } },
    });
    if (user) {
      throw new HttpException(
        strings.USER_ALREADY_EXISTING,
        HttpStatus.CONFLICT,
      );
    }

    // fetch department from DB
    const dept = await this.deptService.getDeptById(body.department);

    // encrypt private key
    const encryptedPrivateKey = this.cipherService.encrypt(
      body.private_key,
      body.password, // using user's secret key to encrypt the private key
    );

    // save user to DB
    const savedUser = await this.usersRepository.save(
      this.usersRepository.create({
        username: body.username,
        privateKey: encryptedPrivateKey,
        departments: [dept],
      }),
    );

    // return user object without the privateKey

    return savedUser;
  }
}

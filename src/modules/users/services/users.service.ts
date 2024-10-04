import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@users/entities/users.entity';
import { STRINGS } from '@app/constants/strings';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their unique identifier (username).
   *
   * @param userId - The unique identifier of the user to find.
   * @returns The found user.
   * @throws HttpException - If the user is not found.
   */
  async findUser(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { username: userId },
    });
    if (!user)
      throw new HttpException(STRINGS.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return user;
  }

  /**
   * Adds a new user to the system.
   *
   * @param user - The user object to be added.
   * @returns The newly added user.
   */
  async addUser(user: User): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create({ username: user.username }),
    );
  }
}

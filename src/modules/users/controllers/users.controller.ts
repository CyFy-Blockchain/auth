import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';

import { UsersService } from '@baseModules/users/services/users.service';
import { User } from '@baseModules/users/entities/users.entity';
import {
  UserCredentials,
  UserRegistration,
} from '@baseModules/users/dto/userCreds.dto';

@ApiTags(SWAGGER_TAGS.USERS)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login the user' })
  @ApiResponse({
    status: 200,
    description: 'User is logged in successfully',
    type: User,
  })
  async loginUser(@Body() body: UserCredentials): Promise<User> {
    return await this.usersService.loginUser(body);
  }

  /**
   * Creates a new user in the database and fetches the primary key from the blockchain node.
   *
   * @param user - The user object to be added to the database.
   * @returns A Promise that resolves to the newly created user.
   *
   * @throws Will throw an error if the user creation fails.
   */
  @Post('/register')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User is created successfully',
    type: UserRegistration,
  })
  async createUser(@Body() user: UserRegistration): Promise<User> {
    return await this.usersService.addUser(user);
  }
}

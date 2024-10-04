import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';

import { UsersService } from '@users/services/users.service';
import { User } from '@users/entities/users.entity';

@ApiTags(SWAGGER_TAGS.USERS)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:username')
  @ApiOperation({ summary: 'Find a user from DB' })
  @ApiResponse({
    status: 200,
    description: 'User is successfully found',
    type: User,
  })
  @ApiParam({ name: 'username', type: String, description: 'User ID' })
  /**
   * Retrieves a user from the database based on the provided username.
   *
   * @param username - The unique identifier of the user to retrieve.
   * @returns A Promise that resolves to the retrieved user.
   *
   * @throws Will throw an error if the user is not found.
   */
  async getUser(@Param('username') username: string): Promise<User> {
    return await this.usersService.findUser(username);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User is created successfully',
    type: User,
  })
  /**
   * Creates a new user in the database.
   *
   * @param user - The user object to be added to the database.
   * @returns A Promise that resolves to the newly created user.
   *
   * @throws Will throw an error if the user creation fails.
   */
  async createUser(@Body() user: User): Promise<User> {
    return await this.usersService.addUser(user);
  }
}

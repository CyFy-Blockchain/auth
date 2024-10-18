import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { UsersService } from '../services/users.service';
import { FetchUser, RegisterUser } from '../dto/users.dto';

@ApiTags(SWAGGER_TAGS.USERS)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User is created successfully',
    type: FetchUser,
  })
  async createUser(@Body() user: RegisterUser): Promise<FetchUser> {
    return await this.usersService.addUser(user);
  }
}

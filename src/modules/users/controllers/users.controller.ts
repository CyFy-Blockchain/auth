import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { UsersService } from '../services/users.service';
import {
  RegisterUserResponse,
  SigninUserRequest,
  SigninUserResponse,
  RegisterUserRequest,
} from '../dto/users.dto';

@ApiTags(SWAGGER_TAGS.USERS)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'Log a new user in' })
  @ApiResponse({
    status: 201,
    description: 'User is successfully signed in',
    type: SigninUserResponse,
  })
  async signinUser(
    @Body() user: SigninUserRequest,
  ): Promise<SigninUserResponse> {
    return await this.usersService.signinUser(user);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user in blockchain' })
  @ApiResponse({
    status: 201,
    description: 'User is successfully registered in',
    type: RegisterUserResponse,
  })
  async registerUser(
    @Body() user: RegisterUserRequest,
    @Headers('token') token: string,
  ): Promise<RegisterUserResponse> {
    return await this.usersService.registerUser({ ...user, token });
  }
}

import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { UsersService } from '../services/users.service';
import {
  RegisterUserResponse,
  SigninUserRequest,
  SigninUserResponse,
  RegisterUserRequest,
  CreateUser,
  AdminLoginRequest,
} from '../dto/users.dto';
import { User } from '../entities/users.entity';

@ApiTags(SWAGGER_TAGS.USERS)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/enroll')
  @ApiOperation({ summary: 'Fetch admin PKI from Blockchain' })
  @ApiResponse({
    status: 201,
    description: 'Admin PKI is successfully fetched',
    type: User,
  })
  async adminLogin(@Body() user: AdminLoginRequest) {
    return await this.usersService.adminLogin(user);
  }

  @Post('/save')
  @ApiOperation({ summary: 'Save a new user in DB' })
  @ApiResponse({
    status: 201,
    description: 'User is successfully signed in',
    type: User,
  })
  async saveUserInDb(@Body() user: CreateUser): Promise<User> {
    return await this.usersService.addUserInDb(user);
  }

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

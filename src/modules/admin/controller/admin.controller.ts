import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import {
  AdminLoginRequest,
  RecoverPasswordRequest,
  RecoverPasswordResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from '../dto/admin.dto';
import { AdminService } from '../services/admin.service';
import { UserDto } from '@app/modules/users/dto/users.dto';
import { SwaggerAuth } from '@app/utils/decorators/swaggerAuth.decorator';

@ApiTags(SWAGGER_TAGS.ADMINS)
@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/enroll')
  @ApiOperation({
    summary: 'Fetch admin PKI from Blockchain',
    description:
      'This Endpoint is only for the super admins to be enrolled on the HLF, so they are synced with the Auth DB. You should NOT use this endpoint for any users other than the ones that were used to bootstrap the HLF network.',
  })
  @ApiResponse({
    status: 201,
    description: 'Admin PKI is successfully fetched',
    type: UserDto,
  })
  async adminLogin(@Body() user: AdminLoginRequest): Promise<UserDto> {
    return await this.adminService.adminLogin(user);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user in blockchain' })
  @ApiResponse({
    status: 201,
    description: 'User is successfully registered in blockchain',
    type: RegisterUserResponse,
  })
  @SwaggerAuth()
  async registerUser(
    @Body() user: RegisterUserRequest,
    @Req() request: Request,
  ): Promise<RegisterUserResponse> {
    const authenticatedUser = request['user'];
    return await this.adminService.registerUser(user, authenticatedUser);
  }

  @Put('/recover-password')
  @ApiOperation({ summary: 'Update a user password for authentication' })
  @ApiResponse({
    status: 201,
    description: 'Password has been successfully updated',
    type: RecoverPasswordResponse,
  })
  @SwaggerAuth()
  async recoverPassword(
    @Body() body: RecoverPasswordRequest,
    @Req() request: Request,
  ): Promise<RecoverPasswordResponse> {
    const authenticatedUser = request['user'];
    return await this.adminService.recoverUserPassword(body, authenticatedUser);
  }
}

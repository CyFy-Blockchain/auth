import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { UsersService } from '../services/users.service';
import {
  GetOrgUsersListResponse,
  SigninUserRequest,
  SigninUserResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
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

  @Post('/update_password')
  @ApiOperation({ summary: 'Update the password of the user' })
  @ApiResponse({
    status: 201,
    description: 'Password has been updated',
    type: UpdatePasswordResponse,
  })
  async updatePassword(
    @Body() body: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> {
    return await this.usersService.updatePassword(body);
  }

  @Get('/organization/:organization_name')
  @ApiOperation({
    summary: 'Fetch all users of an organization',
    description:
      'This Endpoint fetches all the users in the organization along with their total count in the DB',
  })
  @ApiResponse({
    status: 200,
    description: 'All users against the specified organization',
    type: GetOrgUsersListResponse,
  })
  async fetchOrgUsers(@Param('organization_name') organization: string) {
    return await this.usersService.fetchOrgUserList(organization);
  }
}

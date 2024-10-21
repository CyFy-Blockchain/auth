import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { AdminLoginRequest } from '../dto/admin.dto';
import { AdminService } from '../services/admin.service';
import { UserDto } from '@app/modules/users/dto/users.dto';

@ApiTags(SWAGGER_TAGS.ADMINS)
@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/enroll')
  @ApiOperation({ summary: 'Fetch admin PKI from Blockchain' })
  @ApiResponse({
    status: 201,
    description: 'Admin PKI is successfully fetched',
    type: UserDto,
  })
  async adminLogin(@Body() user: AdminLoginRequest): Promise<UserDto> {
    return await this.adminService.adminLogin(user);
  }
}

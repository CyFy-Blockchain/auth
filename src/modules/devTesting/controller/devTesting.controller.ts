import { Body, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { DevTestingRequest, DevTestingResponse } from '../dto/devTesting.dto';
import { envVar } from '@app/config/env/default';

@ApiTags(SWAGGER_TAGS.DEV_TESTING)
@Controller()
export class DevTestingController {
  @Put('/')
  @ApiOperation({ summary: 'Create a new org' })
  @ApiResponse({
    status: 201,
    description: 'Org is created successfully',
    type: DevTestingResponse,
  })
  async createUser(
    @Body() body: DevTestingRequest,
  ): Promise<DevTestingResponse> {
    envVar.fabric.gatewayBaseUrl = body.fabricBaseUrl;
    return { update: true };
  }
}

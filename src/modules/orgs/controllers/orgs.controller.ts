import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { OrgsService } from '../services/orgs.service';
import { CreateOrg, FetchOrg } from '../dto/orgs.dto';

@ApiTags(SWAGGER_TAGS.ORGS)
@Controller()
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Get('/:name')
  @ApiOperation({
    summary: 'Fetch organization by name',
  })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'Name of the organization',
  })
  async fetchOrg(@Param('name') name: string): Promise<FetchOrg> {
    return await this.orgsService.fetchOrg(name);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new org' })
  @ApiResponse({
    status: 201,
    description: 'Org is created successfully',
    type: FetchOrg,
  })
  async createUser(@Body() body: CreateOrg): Promise<FetchOrg> {
    return await this.orgsService.createOrg(body);
  }
}

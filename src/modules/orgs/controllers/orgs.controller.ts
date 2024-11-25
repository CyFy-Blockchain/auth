import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { OrgsService } from '../services/orgs.service';
import { CreateOrg, OrgDto } from '../dto/orgs.dto';
import { SwaggerAuth } from '@app/utils/decorators/swaggerAuth.decorator';

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
  @SwaggerAuth()
  async fetchOrg(@Param('name') name: string): Promise<OrgDto> {
    return await this.orgsService.fetchOrg(name);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new org' })
  @ApiResponse({
    status: 201,
    description: 'Org is created successfully',
    type: OrgDto,
  })
  @SwaggerAuth()
  async createOrg(@Body() body: CreateOrg): Promise<OrgDto> {
    return await this.orgsService.createOrg(body);
  }
}

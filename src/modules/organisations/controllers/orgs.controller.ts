import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '@config/swagger/tags';
import { OrgService } from '../services/orgs.services';
import { RegisterOrg } from '../dto/orgs.dto';
import { ApiDescriptions } from '@config/swagger/apiDescriptions';

@ApiTags(SWAGGER_TAGS.ORGS)
@Controller()
export class OrgController {
  constructor(private orgService: OrgService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create new Organisation',
    description: ApiDescriptions.CREATE_ORG,
  })
  async createDept(@Body() body: RegisterOrg) {
    return await this.orgService.createOrg(body);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', example: 'c2baf3b7-421b-4718-bc21-b95673e9c641' })
  async getOrgById(@Param() id: string) {
    return await this.orgService.getOrgById(id);
  }

  @Get('/')
  async getAllOrgs() {
    return await this.orgService.getAllOrgs();
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    example: 'c2baf3b7-421b-4718-bc21-b95673e9c641',
    type: 'string',
  })
  async deleteOrgById(@Param('id') id: string) {
    console.log('🚀 ~ OrgController ~ deleteOrgById ~ id:', id);

    return await this.orgService.deleteOrgById(id);
  }
}

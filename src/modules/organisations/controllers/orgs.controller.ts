import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '@config/swagger/tags';
import { OrgService } from '../services/orgs.services';
import { RegisterOrg } from '../dto/orgs.dto';

@ApiTags(SWAGGER_TAGS.ORGS)
@Controller()
export class OrgController {
  constructor(private orgService: OrgService) {}

  @Post('/')
  async createDept(@Body() body: RegisterOrg) {
    return await this.orgService.createOrg(body);
  }

  @Get('/:id')
  async getDeptById(@Param() id: string) {
    return await this.orgService.getOrgById(id);
  }

  @Get('/')
  async getAllDepts() {
    return await this.orgService.getAllOrgs();
  }
}

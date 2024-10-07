import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeptService } from '../services/depts.services';
import { RegisterDept } from '../dto/dept.dto';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '@config/swagger/tags';

@ApiTags(SWAGGER_TAGS.DEPTS)
@Controller()
export class DeptController {
  constructor(private deptServices: DeptService) {}

  @Post('/')
  async createDept(@Body() body: RegisterDept) {
    return await this.deptServices.registerDept(body);
  }

  @Get('/:id')
  async getDeptById(@Param() id: string) {
    return await this.deptServices.getDeptById(id);
  }

  @Get('/')
  async getAllDepts() {
    return await this.deptServices.getAllDepts();
  }
}

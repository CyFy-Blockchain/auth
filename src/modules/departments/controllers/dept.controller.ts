import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DeptService } from '../services/depts.services';
import { RegisterDept } from '../dto/dept.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from '@config/swagger/tags';
import { Departments } from '../entity/depts.entity';
import { ApiDescriptions } from '@config/swagger/apiDescriptions';

@ApiTags(SWAGGER_TAGS.DEPTS)
@Controller()
export class DeptController {
  constructor(private deptServices: DeptService) {}

  @Post('/')
  @ApiOperation({
    summary: 'Create a new Department',
    description: ApiDescriptions.CREATE_DEPT,
  })
  @ApiResponse({
    status: 201,
    description: 'Department is successfully created',
    type: Departments,
  })
  async createDept(@Body() body: RegisterDept): Promise<Departments> {
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

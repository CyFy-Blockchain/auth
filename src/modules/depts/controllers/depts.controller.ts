import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { DeptService } from '../services/depts.service';
import { CreateDeptResponse, CreateDeptRequest } from '../dto/depts.dto';

@ApiTags(SWAGGER_TAGS.DEPARTMENTS)
@Controller()
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create a new Department in the hierarchy' })
  @ApiResponse({
    status: 201,
    description: 'Department created successfully',
    type: CreateDeptResponse,
  })
  async createDept(
    @Body() body: CreateDeptRequest,
  ): Promise<CreateDeptResponse> {
    return await this.deptService.createDept(body);
  }
  @Get('/:id')
  @ApiOperation({
    summary: 'Fetch Department by id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the Department',
  })
  @ApiParam({
    name: 'includeHierarchy',
    type: Boolean,
    description: 'To include the top hierachy of the department',
    required: false,
  })
  async fetchDept(
    @Param('id') id: string,
    @Query('includeHierarchy') includeHierarchy: boolean,
  ) {
    return await this.deptService.fetchDept(id, includeHierarchy);
  }
}

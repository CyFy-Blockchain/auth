import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@app/constants/strings';
import { Department } from '../entity/depts.entity';
import { CreateDeptResponse, CreateDeptRequest } from '../dto/depts.dto';
import { mapDeptToDeptDto } from '../dto/depts.mapper';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Department)
    private deptRepository: Repository<Department>,
  ) {}

  async fetchDept(id: string, withHeirarchy = false) {
    const dept = await this.deptRepository.findOne({
      where: { id: id },
      relations: withHeirarchy ? ['parentDept', 'childDepartments'] : [],
    });
    if (!dept) {
      throw new HttpException(strings.DEPT_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return dept;
  }

  async createDept(body: CreateDeptRequest): Promise<CreateDeptResponse> {
    const dept = await this.deptRepository.findOne({
      where: {
        name: body.name,
        organisation: { id: body.parentOrgId },
      },
    });

    if (dept) {
      throw new HttpException(strings.DEPT_ALREADY_EXISTS, HttpStatus.CONFLICT);
    }

    const newDept = this.deptRepository.create({
      name: body.name,
      organisation: { id: body.parentOrgId },
      parentDept: body.parentDeptId ? { id: body.parentDeptId } : null,
    });

    await this.deptRepository.save(newDept);

    return mapDeptToDeptDto(newDept);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departments } from '../entity/depts.entity';
import { strings } from '@constants/strings';
import { RegisterDept } from '../dto/dept.dto';
import { OrgService } from '@baseModules/organisations/services/orgs.services';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(Departments)
    private deptRepository: Repository<Departments>,
    private orgService: OrgService,
  ) {}

  async getAllDepts(): Promise<Departments[]> {
    return await this.deptRepository.find();
  }

  async getDeptById(id: string): Promise<Departments> {
    const dept = await this.deptRepository.findOne({ where: { id } });
    if (!dept) {
      throw new HttpException(
        `${strings.DEPT_NOT_FOUND} id:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return dept;
  }

  async registerDept(deptInfo: RegisterDept) {
    const parentOrg = await this.orgService.getOrgById(deptInfo.parentOrg);
    return await this.deptRepository.save(
      this.deptRepository.create({
        deptName: deptInfo.deptName,
        parentOrg: parentOrg,
      }),
    );
  }
}

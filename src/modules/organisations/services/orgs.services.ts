import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@constants/strings';

import { Organisations } from '@baseModules/organisations/entity/orgs.entity';
import { RegisterOrg } from '@baseModules/organisations/dto/orgs.dto';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(Organisations)
    private orgsRepository: Repository<Organisations>,
  ) {}

  async getAllOrgs(): Promise<Organisations[]> {
    return await this.orgsRepository.find();
  }

  async getOrgById(id: string): Promise<Organisations> {
    const org = await this.orgsRepository.findOne({ where: { id } });
    if (!org) {
      throw new HttpException(
        `${strings.ORG_NOT_FOUND} id:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return org;
  }

  async createOrg(org: RegisterOrg): Promise<Organisations> {
    // fetch parent org from DB
    const parentOrg = await this.getOrgById(org.parentOrgId);

    // save new org with relation
    return await this.orgsRepository.save(
      this.orgsRepository.create({
        orgName: org.orgName,
        parentOrg: parentOrg,
      }),
    );
  }
}

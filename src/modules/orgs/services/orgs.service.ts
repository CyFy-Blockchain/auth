import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Organization } from '../entities/orgs.entity';
import { CreateOrg, OrgDto } from '../dto/orgs.dto';
import { strings } from '@app/constants/strings';

@Injectable()
export class OrgsService {
  constructor(
    @InjectRepository(Organization)
    private orgsRepository: Repository<Organization>,
  ) {}

  async fetchOrg(name: string): Promise<OrgDto> {
    const org = await this.orgsRepository.findOne({
      where: [{ name: name }],
    });
    if (!org) {
      throw new HttpException(strings.ORG_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return org;
  }

  async createOrg(args: CreateOrg): Promise<OrgDto> {
    const org = await this.orgsRepository.findOne({
      where: { name: args.name },
    });
    if (org) {
      throw new HttpException(
        strings.ORG_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.orgsRepository.save(this.orgsRepository.create(args));
  }
}

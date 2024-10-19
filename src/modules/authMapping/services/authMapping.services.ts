import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@app/constants/strings';
import { AuthMapping } from '../entity/authMapping.entity';

@Injectable()
export class AuthMappingService {
  constructor(
    @InjectRepository(AuthMapping)
    private orgsRepository: Repository<AuthMapping>,
  ) {}

  async addFabricUserUuid(fabricUserUUID: string) {
    const authMapping = this.orgsRepository.create({ fabricUserUUID });
    return await this.orgsRepository.save(authMapping);
  }

  async fetchFabricUserUUID(authUUID: string) {
    const authMapping = await this.orgsRepository.findOne({
      where: { id: authUUID },
    });
    if (!authMapping) {
      throw new HttpException(strings.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    return authMapping.fabricUserUUID;
  }
}

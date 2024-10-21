import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@app/constants/strings';
import { AuthMapping } from '../entity/authMapping.entity';

@Injectable()
export class AuthMappingService {
  constructor(
    @InjectRepository(AuthMapping)
    private authMappingRepository: Repository<AuthMapping>,
  ) {}

  async addFabricUserUuid(fabricUserUUID: string) {
    const authMapping = this.authMappingRepository.create({
      fabricUserUUID,
    });
    return await this.authMappingRepository.save(authMapping);
  }

  async fetchFabricUserUUID(authUUID: string) {
    const authMapping = await this.authMappingRepository.findOne({
      where: { id: authUUID },
    });
    if (!authMapping) {
      throw new HttpException(strings.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    return authMapping.fabricUserUUID;
  }
}

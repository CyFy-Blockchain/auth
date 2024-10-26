import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { strings } from '@app/constants/strings';
import { AuthMapping } from '../entity/authMapping.entity';
import { generateUuid } from '@app/utils/helper';
import { User } from '@app/modules/users/entities/users.entity';

@Injectable()
export class AuthMappingService {
  constructor(
    @InjectRepository(AuthMapping)
    private authMappingRepository: Repository<AuthMapping>,
  ) {}

  async addFabricUserUuid(fabricUserUUID: string, user: User) {
    const authUuid = generateUuid();
    const refreshUuid = generateUuid();
    const authMapping = this.authMappingRepository.create({
      fabricUserUuid: fabricUserUUID,
      authUserUuid: authUuid,
      refreshUuid: refreshUuid,
      user: user,
    });
    return await this.authMappingRepository.save(authMapping);
  }

  async fetchFabricUserUUID(authUUID: string) {
    const authMapping = await this.authMappingRepository.findOne({
      where: { authUserUuid: authUUID },
    });
    if (!authMapping) {
      throw new HttpException(strings.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    return authMapping.fabricUserUuid;
  }

  async fetchUserByAuthUUID(authUUID: string) {
    const authMapping = await this.authMappingRepository.findOne({
      where: { authUserUuid: authUUID },
      relations: ['user.organization'],
    });

    return authMapping?.user;
  }
}

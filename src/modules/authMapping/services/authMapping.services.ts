import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { envVar } from '@app/config/env/default';
import { strings } from '@app/constants/strings';
import { AuthMapping } from '../entity/authMapping.entity';
import { generateUuid, daysAgoDate } from '@app/utils/helper';
import { User } from '@app/modules/users/entities/users.entity';

const { accessExpiryDays, refreshExpiryDays } = envVar.token;

@Injectable()
export class AuthMappingService {
  constructor(
    @InjectRepository(AuthMapping)
    private authMappingRepository: Repository<AuthMapping>,
  ) {}

  // refreshUuid will be null for refreshing access tokens. Refresh token will contain value only at the time of login
  async addFabricUserUuid(
    fabricUserUUID: string,
    user: User,
    refreshUuid: string | null = generateUuid(),
  ) {
    const authUuid = generateUuid();
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
      where: {
        authUserUuid: authUUID,
        created_at: MoreThan(daysAgoDate(accessExpiryDays)),
      },
    });
    if (!authMapping) {
      throw new HttpException(strings.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    return authMapping.fabricUserUuid;
  }

  async fetchUserByAuthUUID(authUUID: string) {
    const authMapping = await this.authMappingRepository.findOne({
      where: {
        authUserUuid: authUUID,
        created_at: MoreThan(daysAgoDate(accessExpiryDays)),
      },
      relations: ['user.organization'],
    });

    return authMapping?.user;
  }

  async refreshAccessToken(refreshToken: string) {
    // fetch auth mapping with refresh token within the refresh token expiry date
    const authMapping = await this.authMappingRepository.findOne({
      where: {
        refreshUuid: refreshToken,
        created_at: MoreThan(daysAgoDate(refreshExpiryDays)),
      },
      relations: ['user'],
    });

    if (!authMapping) return null;

    // create a new access token
    // refresh token will only be stored upon login. For all access token generations, refresh token will be null
    // This is to keep track of refresh token so it can be invalidated after its expiry
    return await this.addFabricUserUuid(
      authMapping.fabricUserUuid,
      authMapping.user,
      null,
    );
  }

  async deleteExpiredTokens() {
    return await this.authMappingRepository.delete({
      created_at: LessThan(daysAgoDate(accessExpiryDays + refreshExpiryDays)),
    });
  }
}

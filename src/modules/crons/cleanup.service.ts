import { envVar } from '@app/config/env/default';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AuthMappingService } from '../authMapping/services/authMapping.services';

const { cleanupCron } = envVar.token;

@Injectable()
export class DbCleanupService {
  constructor(private authMappingService: AuthMappingService) {}
  @Cron(cleanupCron)
  async tokenCleanup() {
    console.info('Running token cleanup cron...');

    // Delete all expired tokens to reduce memory usage
    const response = await this.authMappingService.deleteExpiredTokens();

    console.info(
      'Token Cleanup completed with response: ' + JSON.stringify(response),
    );
  }
}

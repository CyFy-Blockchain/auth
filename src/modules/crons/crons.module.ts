import { Module } from '@nestjs/common';

import { DbCleanupService } from './cleanup.service';

@Module({
  providers: [DbCleanupService],
})
export class CronsModule {}

import { Module } from '@nestjs/common';

import { ServerHealthCheckController } from '@server-health-check/controllers/server-health-check.controller';
import { ServerHealthCheckService } from '@server-health-check/services/server-health-check.services';

@Module({
  imports: [],
  controllers: [ServerHealthCheckController],
  providers: [ServerHealthCheckService],
})
export class ServerHealthCheckModule {}

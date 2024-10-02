import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NestConfigModule } from '@config/nest.config.module';
import databaseConfig from '@config/ormconfig';

import { ServerHealthCheckModule } from '@server-health-check/server-health-check.module';

@Module({
  imports: [
    NestConfigModule,
    TypeOrmModule.forRoot(databaseConfig),
    ServerHealthCheckModule,
    RouterModule.register([
      {
        path: 'server-health-check',
        module: ServerHealthCheckModule,
      },
    ]),
  ],
})
export class AppConfigModule {}

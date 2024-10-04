import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NestConfigModule } from '@config/nest.config.module';
import databaseConfig from '@config/ormconfig';

import { ServerHealthCheckModule } from '@server-health-check/server-health-check.module';
import { UsersModule } from '@users/users.module';

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
    UsersModule,
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
      },
    ]),
  ],
})
export class AppConfigModule {}

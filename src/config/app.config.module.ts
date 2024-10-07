import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestConfigModule } from './nest.config.module';

import databaseConfig from '@config/ormconfig';

@Module({
  imports: [NestConfigModule, TypeOrmModule.forRoot(databaseConfig)],
})
export class AppConfigModule {}

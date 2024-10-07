import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestConfigModule } from './nest.config.module';

import databaseConfig from '@config/ormconfig';

@Module({
  imports: [
    NestConfigModule, // .env configuration
    TypeOrmModule.forRoot(databaseConfig), // typeorm configuration
  ],
})
export class AppConfigModule {}

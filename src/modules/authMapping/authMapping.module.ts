import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMapping } from './entity/authMapping.entity';
import { AuthMappingService } from './services/authMapping.services';

@Module({
  imports: [TypeOrmModule.forFeature([AuthMapping])],
  providers: [AuthMappingService],
  exports: [AuthMappingService],
})
export class AuthMappingModule {}

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entity/depts.entity';
import { DeptController } from './controllers/depts.controller';
import { DeptService } from './services/depts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DeptController],
  providers: [DeptService],
})
export class DeptModule {}

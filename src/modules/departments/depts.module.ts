import { Module } from '@nestjs/common';
import { DeptService } from './services/depts.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departments } from './entity/depts.entity';
import { DeptController } from './controllers/dept.controller';
import { OrgModule } from '@baseModules/organisations/orgs.module';

@Module({
  providers: [DeptService],
  imports: [TypeOrmModule.forFeature([Departments]), OrgModule],
  controllers: [DeptController],
  exports: [DeptService],
})
export class DeptModule {}

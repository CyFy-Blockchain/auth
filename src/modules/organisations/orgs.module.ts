import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgService } from '@baseModules/organisations/services/orgs.services';
import { Organisations } from './entity/orgs.entity';
import { OrgController } from './controllers/orgs.controller';

@Module({
  providers: [OrgService],
  imports: [TypeOrmModule.forFeature([Organisations])],
  exports: [OrgService],
  controllers: [OrgController],
})
export class OrgModule {}

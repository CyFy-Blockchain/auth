import { Module } from '@nestjs/common';

import { OrgsController } from './controllers/orgs.controller';
import { OrgsService } from './services/orgs.service';
import { Organization } from './entities/orgs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [OrgsController],
  providers: [OrgsService],
  exports: [OrgsService],
})
export class OrgsModule {}

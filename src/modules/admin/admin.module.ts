import { Module } from '@nestjs/common';

import { UsersModule } from '@app/modules/users/users.module';

import { AxiosService } from '../shared/axios.service';
import { AdminController } from './controller/admin.controller';
import { AdminService } from './services/admin.service';
import { AuthMappingModule } from '../authMapping/authMapping.module';

@Module({
  imports: [UsersModule, AuthMappingModule],
  controllers: [AdminController],
  providers: [AxiosService, AdminService],
})
export class AdminModule {}

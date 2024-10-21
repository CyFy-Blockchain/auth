import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CipherService } from '../shared/cipher.service';
import { AuthMappingModule } from '../authMapping/authMapping.module';
import { AxiosService } from '../shared/axios.service';
import { OrgsModule } from '../orgs/orgs.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthMappingModule, OrgsModule],
  controllers: [UsersController],
  providers: [UsersService, CipherService, AxiosService],
  exports: [UsersService],
})
export class UsersModule {}

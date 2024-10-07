import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CipherService } from '@baseModules/shared/cipher.service';

import { UsersController } from '@baseModules/users/controllers/users.controller';
import { UsersService } from '@baseModules/users/services/users.service';
import { User } from '@baseModules/users/entities/users.entity';
import { DeptModule } from '@baseModules/departments/depts.module';

@Module({
  providers: [UsersService, CipherService],
  imports: [TypeOrmModule.forFeature([User]), DeptModule],
  controllers: [UsersController],
})
export class UsersModule {}

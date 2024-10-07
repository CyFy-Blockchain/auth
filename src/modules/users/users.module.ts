import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CipherService } from '@baseModules/shared/cipher.service';

import { UsersController } from '@baseModules/users/controllers/users.controller';
import { UsersService } from '@baseModules/users/services/users.service';
import { User } from '@baseModules/users/entities/users.entity';
import { DeptModule } from '@baseModules/departments/depts.module';
import { DeptKeychainModule } from '@baseModules/deptKeychain/deptKeychain.module';

@Module({
  providers: [UsersService, CipherService],
  imports: [TypeOrmModule.forFeature([User]), DeptModule, DeptKeychainModule],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { DeptKeychainService } from './services/deptKeychain.services';
import { DeptKeychain } from './entity/deptKeychain.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DeptKeychainService],
  imports: [TypeOrmModule.forFeature([DeptKeychain])],
  exports: [DeptKeychainService],
})
export class DeptKeychainModule {}

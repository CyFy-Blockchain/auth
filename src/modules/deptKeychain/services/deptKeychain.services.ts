import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeptKeychain } from '../entity/deptKeychain.entity';
import { RegisterDeptKeychain } from '../dto/deptKeychain.dto';

@Injectable()
export class DeptKeychainService {
  constructor(
    @InjectRepository(DeptKeychain)
    private deptKeychainRepository: Repository<DeptKeychain>,
  ) {}

  async addKeychain(userInfo: RegisterDeptKeychain) {
    const { userId, deptId, userPrivateKey } = userInfo;
    const newKeychain = this.deptKeychainRepository.create({
      department: { id: deptId },
      user: { id: userId },
      user_private_key: userPrivateKey,
    });
    await this.deptKeychainRepository.save(newKeychain);
    return newKeychain;
  }
}

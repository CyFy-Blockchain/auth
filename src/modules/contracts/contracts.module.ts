import { Module } from '@nestjs/common';

import { AxiosService } from '../shared/axios.service';
import { ContractService } from './services/contract.service';
import { ContractsController } from './controllers/contracts.controller';

@Module({
  controllers: [ContractsController],
  providers: [ContractService, AxiosService],
})
export class ContractModule {}

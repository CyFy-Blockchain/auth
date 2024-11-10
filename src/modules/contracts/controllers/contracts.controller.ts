import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { ContractService } from '../services/contract.service';
import { ContractCallRequest } from '../dto/contracts.dto';

@ApiTags(SWAGGER_TAGS.CONTRACTS)
@Controller()
export class ContractsController {
  constructor(private readonly contractService: ContractService) {}

  @Post('/contract-call')
  @ApiOperation({ summary: 'Log a new user in' })
  @ApiResponse({
    status: 201,
    description: 'Contract call was successful',
    type: ContractCallRequest,
  })
  async contractCall(
    @Body() contractCallParams: ContractCallRequest,
    @Headers('token') token: string,
  ): Promise<any> {
    return await this.contractService.makeContractCall({
      ...contractCallParams,
      token,
    });
  }
}

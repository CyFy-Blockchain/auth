import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SWAGGER_TAGS } from '@config/swagger/tags';
import { ContractService } from '../services/contract.service';
import { ContractCallRequest } from '../dto/contracts.dto';
import { SwaggerAuth } from '@app/utils/decorators/swaggerAuth.decorator';

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
  @SwaggerAuth()
  async contractCall(
    @Body() contractCallParams: ContractCallRequest,
    @Req() request: Request,
  ): Promise<any> {
    const user = request['user'];
    return await this.contractService.makeContractCall(
      contractCallParams,
      user,
    );
  }
}

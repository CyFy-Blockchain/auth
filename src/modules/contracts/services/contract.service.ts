import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { strings } from '@app/constants/strings';
import { AxiosService } from '@app/modules/shared/axios.service';
import { ContractCallRequest } from '../dto/contracts.dto';
import { AuthenticatedUser } from '@app/modules/users/dto/users.dto';

@Injectable()
export class ContractService {
  constructor(private axiosService: AxiosService) {}

  async makeContractCall(
    contractCallParams: ContractCallRequest,
    caller: AuthenticatedUser,
  ) {
    try {
      const response = await this.axiosService.post(
        '/api/v1/auth/call-contract',
        { ...contractCallParams, token: caller.fabricUuid },
      );

      return response;
    } catch (error) {
      throw new HttpException(
        strings.CONTRACT_CALL_FAILED,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}

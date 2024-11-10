import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { strings } from '@app/constants/strings';
import { AxiosService } from '@app/modules/shared/axios.service';
import { ContractCallRequest } from '../dto/contracts.dto';
import { AuthMappingService } from '@app/modules/authMapping/services/authMapping.services';

@Injectable()
export class ContractService {
  constructor(
    private axiosService: AxiosService,
    private authMappingService: AuthMappingService,
  ) {}

  async makeContractCall(contractCallParams: ContractCallRequest) {
    // check if the token belongs to the admin
    const fabricId = await this.authMappingService.fetchFabricUserUUID(
      contractCallParams.token,
    );
    if (!fabricId)
      throw new HttpException(
        strings.USER_INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    try {
      const response = await this.axiosService.post(
        '/api/v1/auth/call-contract',
        { ...contractCallParams, token: fabricId },
      );
      console.log(
        '🚀 ~ ContractService ~ makeContractCall ~ response:',
        response,
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

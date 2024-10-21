import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { strings } from '@app/constants/strings';
import { UsersService } from '@app/modules/users/services/users.service';
import { AdminLoginRequest } from '../dto/admin.dto';
import { AxiosService } from '@app/modules/shared/axios.service';
import { mapUserToUserDto } from '@app/modules/users/dto/users.mapper';
import { UserDto } from '@app/modules/users/dto/users.dto';

@Injectable()
export class AdminService {
  constructor(
    private userService: UsersService,
    private axiosService: AxiosService,
  ) {}

  async adminLogin(user: AdminLoginRequest): Promise<UserDto> {
    // check if user exists
    const userDb = await this.userService.fetchUserByUsername(user.username);
    if (userDb) {
      throw new HttpException(
        strings.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    // fetch admin creds from blockchain
    const response = await this.axiosService.post('/api/v1/auth/enroll', user);

    // add user in DB
    const savedUser = await this.userService.addUserInDb({
      username: user.username,
      password: user.password,
      orgName: user.orgName,
      privateKey: response.privateKey,
      publicKey: response.publickKey,
      isAdmin: true,
    });

    return mapUserToUserDto(savedUser);
  }
}

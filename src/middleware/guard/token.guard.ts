import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthMappingService } from '@app/modules/authMapping/services/authMapping.services';
import { strings } from '@app/constants/strings';
import { AuthenticatedUser } from '@app/modules/users/dto/users.dto';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private authMappingService: AuthMappingService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];
    if (!token) {
      throw new HttpException(strings.MISSING_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    const user: AuthenticatedUser =
      await this.authMappingService.fetchUserByAuthUUID(token as string);
    const fabricUuid = await this.authMappingService.fetchFabricUserUUID(
      token as string,
    );
    if (!user || !fabricUuid) {
      throw new HttpException(strings.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }

    user.fabricUuid = fabricUuid;
    // Attach user to the request object
    request['user'] = user;

    return true;
  }
}

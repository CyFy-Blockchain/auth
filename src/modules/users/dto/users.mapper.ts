import { User } from '../entities/users.entity';
import { UserDto } from './users.dto';

export function mapUserToUserDto(user: User): UserDto {
  return {
    id: user.id,
    username: user.username,
    publicKey: user.publicKey,
    userRole: user.userRole,
    organization: { id: user.organization.id, name: user.organization.name },
  };
}

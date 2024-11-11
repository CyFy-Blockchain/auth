import { User } from '../entities/users.entity';
import { UserDto } from './users.dto';

export function mapUserToUserDto(user: User): UserDto {
  return {
    id: user.id,
    username: user.username,
    publicKey: user.publicKey,
    organization: {
      id: user.department.organisation.id,
      name: user.department.organisation.name,
    },
  };
}

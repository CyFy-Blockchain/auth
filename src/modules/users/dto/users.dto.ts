import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrgDto } from '@app/modules/orgs/dto/orgs.dto';
import { AdminRole } from './users.enum';
import { User } from '../entities/users.entity';

// POST -> Update password
export class UpdatePasswordRequest {
  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({ example: 'testUser', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password', required: true })
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'oldPassword', required: true })
  @IsNotEmpty()
  oldPassword: string;
}

export class UpdatePasswordResponse {
  @ApiProperty({ example: 'Password has been updated', required: true })
  @IsNotEmpty()
  message: string;
}

// POST -> Sign in user
export class SigninUserResponse {
  @ApiProperty({
    example: 'bc649a94-0300-4136-aa4a-0fc51f581ab4',
    required: true,
  })
  token: string;

  @ApiProperty({
    example: '2d620505-e413-4d18-8877-b9fa3c484905',
    required: true,
  })
  refreshToken: string;
}

export class SigninUserRequest {
  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({ example: 'testUser', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password', required: true })
  @IsNotEmpty()
  password: string;
}

// Service Types
export class CreateUser {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  publicKey: string;

  @IsNotEmpty()
  privateKey: string;

  @IsNotEmpty()
  deptId: string;

  @IsEnum(AdminRole)
  userRole?: AdminRole;
}

export class UserDto {
  @ApiProperty({
    example: 'admin',
    description: 'The username of the user',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'publicKey',
    description: 'The public key associated with the user',
    required: true,
  })
  @IsNotEmpty()
  publicKey: string;

  @ApiProperty({
    description: 'The organization associated with the user',
    required: true,
    type: () => OrgDto,
  })
  @ValidateNested()
  @Type(() => OrgDto)
  organization: OrgDto;

  @ApiProperty({
    example: '1a973561-939d-4ae9-aad9-de1b80ce69f9',
    description: 'The unique identifier for the user',
    required: true,
  })
  @IsUUID()
  id: string;
}

export class UserPki {
  user: User;
  pki: {
    privateKey: string;
    publicKey: string;
    orgName: string;
  };
}

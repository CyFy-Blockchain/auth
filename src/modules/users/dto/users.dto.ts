import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrgDto } from '@app/modules/orgs/dto/orgs.dto';
import { UserRole } from './users.enum';

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
  @ApiProperty({ example: 'admin', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'adminpw', required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'public_key', required: true })
  @IsNotEmpty()
  publicKey: string;

  @ApiProperty({ example: 'private_key', required: true })
  @IsNotEmpty()
  privateKey: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({
    example: UserRole.Client,
    enum: UserRole,
    default: UserRole.Client,
  })
  @IsEnum(UserRole)
  userRole?: UserRole;
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
    example: UserRole.Client,
    enum: UserRole,
    default: UserRole.Client,
  })
  @IsEnum(UserRole)
  userRole?: UserRole;

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
  privateKey: string;
  publicKey: string;
  orgName: string;
}

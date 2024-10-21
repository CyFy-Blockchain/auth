import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrgDto } from '@app/modules/orgs/dto/orgs.dto';

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

// POST -> Register user
export class RegisterUserResponse {
  @ApiProperty({ example: 'pswrd', required: true })
  secret: string;
}

export class RegisterUserRequest {
  @ApiProperty({ example: 'testUser', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({ example: 'false', default: false })
  @IsBoolean()
  isAdmin?: boolean;

  @IsUUID()
  @IsNotEmpty()
  token: string;
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

  @ApiProperty({ example: 'false', default: false })
  @IsBoolean()
  isAdmin?: boolean;
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
    example: true,
    description: 'Boolean value indicating if the user is an admin',
    required: true,
  })
  @IsBoolean()
  isAdmin: boolean;

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

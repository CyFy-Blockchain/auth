import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

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

  @IsUUID()
  @IsNotEmpty()
  token: string;
}

// POST -> Admin login from Blockchain
export class AdminLoginRequest {
  @ApiProperty({ example: 'admin', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'adminpw', required: true })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty()
  orgName: string;
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
}

export class UserPki {
  privateKey: string;
  publicKey: string;
  orgName: string;
}

import { AdminRole } from '@app/modules/users/dto/users.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

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

// POST -> Register user

export class RegisterUserRequest {
  @ApiProperty({ example: 'testUser', required: true })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({
    example: AdminRole.User,
    enum: AdminRole,
    default: AdminRole.User,
  })
  @IsEnum(AdminRole)
  userRole: AdminRole;

  @IsUUID()
  @IsNotEmpty()
  token: string;
}

export class RegisterUserResponse {
  @ApiProperty({ example: 'pswrd', required: true })
  secret: string;
}

// PUT -> Recover user password
export class RecoverPasswordRequest {
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

export class RecoverPasswordResponse {
  @ApiProperty({ example: 'pswrd', required: true })
  secret: string;
}

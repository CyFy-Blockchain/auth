import { UserRole } from '@app/modules/users/dto/users.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

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
    example: UserRole.Client,
    enum: UserRole,
    default: UserRole.Client,
  })
  @IsEnum(UserRole)
  userRole: UserRole;

  @IsUUID()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    example: 'HOD,Teacher,CS',
    description:
      'This defines the attributes the user can forward to any certificate it creates. This is only used if passed with userRole: admin. Clients can not create users',
  })
  @IsOptional()
  attr: string;

  @ApiProperty({ example: 'Computer Science', required: true })
  @IsNotEmpty()
  deptName: string;

  @ApiProperty({ example: 'HOD', required: true })
  @IsNotEmpty()
  position: string;
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

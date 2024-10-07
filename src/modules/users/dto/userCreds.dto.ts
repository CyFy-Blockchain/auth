import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UserRequired {
  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'org1', required: true })
  @IsString()
  @IsNotEmpty()
  department: string;
}

export class UserCredentials extends UserRequired {
  @ApiProperty({ example: 'adminpw', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserRegistration extends UserRequired {
  @ApiProperty({ example: 'adminpw', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 'private_key_here', required: false })
  @IsString()
  @IsOptional()
  private_key?: string;

  @ApiProperty({ example: 'public_key_here', required: false })
  @IsString()
  @IsOptional()
  public_key?: string;
}

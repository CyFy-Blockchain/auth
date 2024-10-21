import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

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

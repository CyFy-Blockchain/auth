import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterOrg {
  @ApiProperty({ example: 'CyFy', required: true })
  @IsString()
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({ example: '2' })
  @IsOptional()
  @IsNotEmpty()
  parentOrgId?: string;
}

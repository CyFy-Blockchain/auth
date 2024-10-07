import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RegisterOrg {
  @ApiProperty({ example: 'CyFy', required: true })
  @IsString()
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({ example: '82d4d3de-642d-461a-90f4-a15cd53d6ca8' })
  @IsOptional()
  @IsUUID()
  parentOrgId?: string;
}

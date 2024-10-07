import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RegisterDept {
  @ApiProperty({ example: 'Computer Sciences' })
  @IsString()
  @IsNotEmpty()
  deptName: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  parentOrg: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDept {
  @ApiProperty({ example: 'Computer Sciences' })
  @IsString()
  @IsNotEmpty()
  deptName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentOrg: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

// POST /departments
export class CreateDeptRequest {
  @ApiProperty({ example: 'Super Dept', required: true })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'b68888f2-6af2-40dd-816e-17fb652c01bc',
    required: true,
  })
  @IsUUID()
  parentOrgId: string;

  @ApiProperty({
    example: '2d620505-e413-4d18-8877-b9fa3c484905',
    required: true,
  })
  @IsOptional()
  @IsUUID()
  parentDeptId?: string;
}

export class CreateDeptResponse extends CreateDeptRequest {
  @ApiProperty({
    example: '677e7abf-a71e-4a3e-84b2-5baf2b1d9651',
    required: true,
  })
  id: string;
}

// GET /departments

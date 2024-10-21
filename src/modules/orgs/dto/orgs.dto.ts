import { ApiProperty } from '@nestjs/swagger';

export class CreateOrg {
  @ApiProperty({ example: 'CyFy', required: true })
  name: string;
}

export class OrgDto extends CreateOrg {
  @ApiProperty({
    example: '677e7abf-a71e-4a3e-84b2-5baf2b1d9651',
    required: true,
  })
  id: string;
}

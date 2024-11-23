import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class DevTestingRequest {
  @ApiProperty({
    example: 'https://677e7abf-a71e-4a3e-84b2-5baf2b1d9651.ngrok.com/',
    required: true,
  })
  @IsString()
  fabricBaseUrl: string;
}

export class DevTestingResponse {
  @ApiProperty({
    example: true,
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  update: boolean;
}

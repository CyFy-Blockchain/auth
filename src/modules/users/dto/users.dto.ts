import { ApiProperty } from '@nestjs/swagger';

export class RegisterUser {
  @ApiProperty({ example: 'testUser', required: true })
  username: string;

  @ApiProperty({ example: 'testPrivKey', required: true })
  privateKey: string;

  @ApiProperty({ example: 'publicKey', required: true })
  publicKey: string;
}

export class FetchUser extends RegisterUser {
  @ApiProperty({ example: 'false', required: true })
  isAdmin: boolean;
}

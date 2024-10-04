import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, BaseEntity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ example: 'admin', required: true })
  @IsNotEmpty()
  @Column({ primary: true })
  username: string;
}

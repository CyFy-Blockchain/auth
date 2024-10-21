import { User } from '@app/modules/users/entities/users.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'auth_mapping' })
export class AuthMapping extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fabric_gateway_uuid', nullable: false })
  fabricUserUUID: string;

  @ManyToMany(() => User, (user) => user.authMappings)
  users: User[];
}

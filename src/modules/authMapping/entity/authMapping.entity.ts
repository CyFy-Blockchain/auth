import { User } from '@app/modules/users/entities/users.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'auth_mapping' })
export class AuthMapping extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fabric_gateway_uuid', nullable: false })
  fabricUserUuid: string;

  @Column({ name: 'auth_uuid', nullable: false })
  authUserUuid: string;

  @Column({ name: 'refresh_uuid', nullable: false })
  refreshUuid: string;

  @ManyToOne(() => User, (user) => user.authMappings, { onDelete: 'CASCADE' })
  user: User;
}

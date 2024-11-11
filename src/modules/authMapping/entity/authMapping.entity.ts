import { User } from '@app/modules/users/entities/users.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
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

  // Each user has exactly one AuthMapping
  @OneToOne(() => User, (user) => user.authMapping)
  user: User;
}

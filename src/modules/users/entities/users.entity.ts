import { Organization } from '@app/modules/orgs/entities/orgs.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  ManyToMany,
} from 'typeorm';
import { UserRole } from '../dto/users.enum';
import { AuthMapping } from '@app/modules/authMapping/entity/authMapping.entity';

@Entity({ name: 'userss' })
@Unique(['username', 'organization']) // This ensures that each user within org is unique
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ name: 'public_key', nullable: false })
  publicKey: string;

  @Column({ name: 'private_key', nullable: false })
  privateKey: string;

  @Column({
    name: 'user_role',
    nullable: false,
    type: 'enum',
    enum: UserRole,
    default: UserRole.Client,
  })
  userRole: UserRole;

  @Column({ name: 'recoverable_key', nullable: false })
  recoverableKey: string;

  @ManyToOne(() => Organization, (org) => org.members, { nullable: false })
  organization: Organization;

  @ManyToMany(() => AuthMapping, (authMapping) => authMapping.users)
  authMappings: AuthMapping[];
}

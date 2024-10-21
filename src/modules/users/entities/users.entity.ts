import { Organization } from '@app/modules/orgs/entities/orgs.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@Entity({ name: 'userss' })
@Unique(['username', 'organization']) // This ensures that each user within org is unique
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ name: 'public_key', nullable: false })
  publicKey: string;

  @Column({ name: 'private_key', nullable: false, select: false })
  privateKey: string;

  @Column({ name: 'is_admin', nullable: false, type: Boolean })
  isAdmin: boolean;

  @Column({ name: 'recoverable_key', nullable: false, select: false })
  recoverableKey: string;

  @ManyToOne(() => Organization, (org) => org.members, { nullable: false })
  organization: Organization;
}

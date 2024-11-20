import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { AuthMapping } from '@app/modules/authMapping/entity/authMapping.entity';
import { Department } from '@app/modules/depts/entity/depts.entity';
import { UserRole } from '@app/modules/users/dto/users.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // User belongs to a Department
  @ManyToOne(() => Department, (department) => department.users)
  @JoinColumn({ name: 'dept_id' })
  department: Department;

  // 1-1 relationship with AuthMapping
  @OneToOne(() => AuthMapping, (authMapping) => authMapping.user)
  @JoinColumn({ name: 'auth_mapping' })
  authMapping?: AuthMapping;

  @Column({ nullable: false })
  username: string;

  @Column({ name: 'public_key', nullable: false })
  publicKey: string;

  @Column({ name: 'private_key', nullable: false })
  privateKey: string;

  @Column({ name: 'recoverable_key', nullable: false })
  recoverableKey: string;

  @Column({
    name: 'user_role',
    nullable: false,
    type: 'enum',
    enum: UserRole,
    default: UserRole.Student,
  })
  userRole: UserRole;
}

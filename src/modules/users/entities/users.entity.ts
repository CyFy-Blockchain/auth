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
import { Organisation } from '@app/modules/orgs/entities/orgs.entity';
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

  // Polymorphic relation: a user can be either a Student or an Admin
  @OneToOne(() => Student, (student) => student.user)
  @OneToOne(() => Admin, (admin) => admin.user)
  userType?: Student | Admin;

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

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // A student is actually a user
  @OneToOne(() => User, (user) => user.userType)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // a single Admin can administer an entire organisation
  @OneToOne(() => Organisation, (organisation) => organisation.admin)
  @JoinColumn({ name: 'org_id' })
  organisation?: Organisation;

  // An admin is actually a user
  @OneToOne(() => User, (user) => user.userType)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

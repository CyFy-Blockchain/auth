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
import { AdminRole } from '@app/modules/users/dto/users.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // User belongs to a Department
  @ManyToOne(() => Department, (department) => department.students)
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
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Student belongs to one department
  @ManyToOne(() => Department, (department) => department.admins)
  @JoinColumn({ name: 'dept_id' })
  department: Department;

  // A student is actually a user
  @OneToOne(() => User, (user) => user.userType)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Admin belongs to one department
  @ManyToOne(() => Department, (department) => department.admins)
  @JoinColumn({ name: 'dept_id' })
  department: Department;

  // a single Admin can administer an entire organisation
  @OneToOne(() => Organisation, (organisation) => organisation.admin)
  organisation?: Organisation;

  // An admin is actually a user
  @OneToOne(() => User, (user) => user.userType)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({
    name: 'admin_role',
    nullable: false,
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.User,
  })
  adminRole: AdminRole;
}

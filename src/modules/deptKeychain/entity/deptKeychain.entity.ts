import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';
import { Departments } from '@baseModules/departments/entity/depts.entity';
import { User } from '@baseModules/users/entities/users.entity';

@Entity({ name: 'dept_keychain' })
@Unique(['user', 'department']) // Enforce a unique combination of user and department
export class DeptKeychain extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Many keychains can belong to one department
  @ManyToOne(() => Departments, (dept) => dept.id, {
    onDelete: 'CASCADE', // If a department is deleted, remove associated keychain entries
  })
  department: Departments;

  // Many keychains can belong to one user
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE', // If a user is deleted, remove their keychain entries
  })
  user: User;

  @Column({ nullable: false })
  user_private_key: string; // Encrypted private key of the user specific to the department
}

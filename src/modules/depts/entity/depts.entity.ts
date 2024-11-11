import { Organisation } from '@app/modules/orgs/entities/orgs.entity';
import { Admin, User } from '@app/modules/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['organisation', 'name'])
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  // Department belongs to one Organisation
  @ManyToOne(() => Organisation, (organisation) => organisation.departments)
  @JoinColumn({ name: 'org_id' })
  organisation: Organisation;

  // Department can have multiple child departments (self-referencing)
  @OneToMany(() => Department, (department) => department.parentDept)
  childDepartments: Department[];

  // Department can have multiple users
  @OneToMany(() => User, (user) => user.department)
  students: User[];

  // Department can have multiple admins
  @OneToMany(() => Admin, (admin) => admin.department)
  admins: Admin[];

  // Reference to parent department (optional, used in case of nested departments)
  @ManyToOne(() => Department, (department) => department.childDepartments)
  @JoinColumn({ name: 'parent_dept_id' })
  parentDept: Department;

  // Add other fields like name, etc.
  @Column({ nullable: false })
  name: string;
}

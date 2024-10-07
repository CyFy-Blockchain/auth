import {
  Column,
  Entity,
  BaseEntity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Departments } from '@baseModules/departments/entity/depts.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  privateKey: string;

  // Remove @Column() for relationships
  @ManyToMany(() => Departments, (dept) => dept.users, { cascade: true })
  @JoinTable()
  departments: Departments[];

  @Column({ nullable: true }) // Optional publicKey
  publicKey?: string;
}

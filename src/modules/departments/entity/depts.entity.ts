import { Organisations } from '@baseModules/organisations/entity/orgs.entity';
import { User } from '@baseModules/users/entities/users.entity';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'departments' })
export class Departments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  deptName: string;

  @ManyToOne(() => Organisations, (org) => org.childDepts)
  parentOrg: Organisations;

  @ManyToMany(() => User, (user) => user.departments)
  users: User[];
}

import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Departments } from '@baseModules/departments/entity/depts.entity';

@Entity({ name: 'organisations' })
export class Organisations extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  orgName: string;

  // Many organizations can have the same parent (ManyToOne relationship)
  @ManyToOne(() => Organisations, (org) => org.childOrgs, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parentOrg?: Organisations;

  // One organization can have multiple child organizations (OneToMany relationship)
  @OneToMany(() => Organisations, (org) => org.parentOrg)
  childOrgs?: Organisations[];

  // One organization can have multiple departments (OneToMany relationship)
  @OneToMany(() => Departments, (dept) => dept.id)
  childDepts?: Departments[];
}

import { DeptKeychain } from '@baseModules/deptKeychain/entity/deptKeychain.entity';
import { Organisations } from '@baseModules/organisations/entity/orgs.entity';

import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'departments' })
export class Departments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  deptName: string;

  @ManyToOne(() => Organisations, (org) => org.childDepts, {
    onDelete: 'CASCADE',
  })
  parentOrg?: Organisations;

  @OneToMany(() => DeptKeychain, (deptKeychain) => deptKeychain.department)
  deptKeychains?: DeptKeychain[];
}

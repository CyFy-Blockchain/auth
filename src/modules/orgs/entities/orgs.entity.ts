import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Department } from '@app/modules/depts/entity/depts.entity';
import { Admin } from '@app/modules/users/entities/users.entity';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Organisation has many departments
  @OneToMany(() => Department, (department) => department.organisation)
  departments: Department[];

  // Organisation has 1 admin
  @OneToOne(() => Admin)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column({ nullable: false })
  name: string;
}

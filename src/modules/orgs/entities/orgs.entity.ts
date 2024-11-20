import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Department } from '@app/modules/depts/entity/depts.entity';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Organisation has many departments
  @OneToMany(() => Department, (department) => department.organisation)
  departments: Department[];

  @Column({ nullable: false, unique: true })
  name: string;
}

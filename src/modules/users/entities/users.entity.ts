import {
  Column,
  Entity,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DeptKeychain } from '@baseModules/deptKeychain/entity/deptKeychain.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  privateKey: string;

  @OneToMany(() => DeptKeychain, (deptKeychain) => deptKeychain.user, {
    onDelete: 'CASCADE',
  })
  deptKeychains?: DeptKeychain[];

  @Column({ nullable: true }) // Optional publicKey
  publicKey?: string;
}

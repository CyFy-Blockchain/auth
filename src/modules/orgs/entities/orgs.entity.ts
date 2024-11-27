import { TimestampedEntity } from '@app/modules/shared/entities/timestamped.entity';
import { User } from '@app/modules/users/entities/users.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'organizations' })
export class Organization extends TimestampedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => User, (user) => user.organization)
  members: User[];
}

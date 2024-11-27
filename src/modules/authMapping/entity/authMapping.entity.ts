import { TimestampedEntity } from '@app/modules/shared/entities/timestamped.entity';
import { User } from '@app/modules/users/entities/users.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'auth_mapping' })
export class AuthMapping extends TimestampedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fabric_gateway_uuid', nullable: false })
  fabricUserUuid: string;

  @Column({ name: 'auth_uuid', nullable: false })
  authUserUuid: string;

  @Column({ name: 'refresh_uuid', nullable: true }) // this field is set null for all the refreshed access token rows
  refreshUuid?: string;

  @ManyToOne(() => User, (user) => user.authMappings, { onDelete: 'CASCADE' })
  user: User;
}

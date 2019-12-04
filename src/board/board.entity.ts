// tslint:disable:variable-name
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  background: string;

  @ManyToOne(type => User, user => user.id)
  owner: User;

  @Column({ nullable: true })
  memberIds: string;

  @Column({ type: 'datetime', name: 'created_at' })
  created_at: Date;

  @Column({ type: 'datetime', name: 'updated_at' })
  updated_at: Date;
}

// tslint:disable:variable-name
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'datetime', name: 'created_at' })
  created_at: Date;

  @Column({ type: 'datetime', name: 'updated_at' })
  updated_at: Date;
}

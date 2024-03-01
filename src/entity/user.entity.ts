import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'enum', enum: ['male', 'female'], default: 'male' })
  gender: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  userType: string;

  @Column({ type: 'varchar' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Timestamp;
}

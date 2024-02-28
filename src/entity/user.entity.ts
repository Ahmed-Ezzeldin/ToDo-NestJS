import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'enum', enum: ['male', 'female'], default: 'male' })
  gender: string;

  @Column({ type: 'varchar' })
  password: string;
}

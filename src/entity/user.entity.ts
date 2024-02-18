import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;
}

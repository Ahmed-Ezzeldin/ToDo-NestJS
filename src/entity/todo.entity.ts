import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @Column({ type: 'enum', default: 'low', enum: ['low', 'high', 'medium'] })
  priority: string;
}

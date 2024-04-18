import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';

export const dbConfig: TypeOrmModuleOptions = {
  database: 'Todo_db',
  type: 'postgres',
  port: 5433,
  username: 'postgres',
  password: '123456789',
  host: '127.0.0.1',
  //   entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [Todo, User],
};

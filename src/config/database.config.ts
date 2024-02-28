import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  port: 5433,
  password: '123456789',
  host: '127.0.0.1',
  database: 'Todo_db',
  synchronize: true,
  //   entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [Todo, User],
};

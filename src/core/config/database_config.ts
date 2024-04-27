import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // port: 5433,
  // database: 'Todo_db',
  // username: 'postgres',
  // password: '123456789',
  port: 5432,
  database: 'todo_db_giua',
  username: 'postgres_user',
  password: 'yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x',
  host: '127.0.0.1',
  //   entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [Todo, User],
};

/*
Internal Database URL:-  
postgres://postgres_user:yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x@dpg-comfhmq1hbls73f2n3ng-a/todo_db_giua

External Database URL:-
postgres://postgres_user:yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x@dpg-comfhmq1hbls73f2n3ng-a.oregon-postgres.render.com/todo_db_giua

*/
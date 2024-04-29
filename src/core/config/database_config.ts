import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';

export const dbConfigLocal: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5433,
  database: 'Todo_db',
  username: 'postgres',
  password: '123456789',
  host: '127.0.0.1',
  //   entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [Todo, User],
};

export const dbConfigServer: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  database: 'todo_db_giua',
  username: 'postgres_user',
  password: 'yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x',
  host: 'dpg-comfhmq1hbls73f2n3ng-a.oregon-postgres.render.com',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  logging: false,
  logger: 'advanced-console',
  entities: [Todo, User],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

/*

================================================================= Server (Render)
Hostname: dpg-comfhmq1hbls73f2n3ng-a
Port: 5432
Database: todo_db_giua
Username: postgres_user
Password: yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x
Internal Database URL: postgres://postgres_user:yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x@dpg-comfhmq1hbls73f2n3ng-a/todo_db_giua
External Database URL: postgres://postgres_user:yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x@dpg-comfhmq1hbls73f2n3ng-a.oregon-postgres.render.com/todo_db_giua
PSQL Command: PGPASSWORD=yjdOq5mpCsdgzfFYHBIPjbHyht0rCD5x psql -h dpg-comfhmq1hbls73f2n3ng-a.oregon-postgres.render.com -U postgres_user todo_db_giua

*/

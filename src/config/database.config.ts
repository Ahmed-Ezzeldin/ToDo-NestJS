import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const devConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3000,
  username: 'postgres',
  password: '1234',
  database: 'AWT',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};

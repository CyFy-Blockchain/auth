import { DataSourceOptions } from 'typeorm';
import { envVar } from './env/default';

const isProduction = envVar.env === 'production' || envVar.env === 'staging';
const dbEnv = envVar.db;

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: dbEnv.host || 'localhost',
  port: parseInt(dbEnv.port, 10) || 5435,
  username: dbEnv.username || '',
  password: dbEnv.password || '',
  database: dbEnv.database || '',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: !isProduction,
  ...(isProduction
    ? {
        ssl: true,
      }
    : {}),
};

export default databaseConfig;

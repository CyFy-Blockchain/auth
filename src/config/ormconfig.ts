import { DataSourceOptions } from 'typeorm';
import { envConfig } from './default/envConfig';

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

const dbConfig = envConfig.db;

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
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

import { DataSourceOptions } from 'typeorm';

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5435,
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
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

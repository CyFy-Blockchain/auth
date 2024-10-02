import { DataSourceOptions } from 'typeorm';

const isProduction =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
  ...(isProduction
    ? {
        ssl: true,
      }
    : {}),
};

export default databaseConfig;

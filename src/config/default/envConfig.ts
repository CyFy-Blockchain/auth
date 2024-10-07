export const envConfig = {
  env: process.env.NODE_ENV,
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    port: parseInt(process.env.DB_PORT, 10) || 5435,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
  },
};

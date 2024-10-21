export const envVar = {
  env: process.env.NODE_ENV,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  server: {
    port: process.env.PORT || 4000,
    recoverable_encryption_key: process.env.RECOVERABLE_ENCRYPTION_KEY,
  },
  fabric: {
    gatewayBaseUrl: process.env.FABRIC_GW_BASE_URL,
  },
};

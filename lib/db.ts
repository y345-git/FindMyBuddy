
import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export const getDb = () => {
  if (!pool) {
    const host = process.env.MYSQL_HOST;
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;
    const port = process.env.MYSQL_PORT || '3306';
    const useSsl = process.env.MYSQL_SSL === 'true';

    if (!host || !user || !database) {
      throw new Error(`Database configuration missing. Required: host, user, database.`);
    }

    try {
      const config: mysql.PoolOptions = {
        host,
        user,
        password,
        database,
        port: parseInt(port),
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
        connectTimeout: 10000,
      };

      // Only add SSL if explicitly requested
      if (useSsl) {
        config.ssl = { rejectUnauthorized: false };
      }

      pool = mysql.createPool(config);
      console.log(`Connected to MySQL at ${host} (SSL: ${useSsl})`);
    } catch (err: any) {
      console.error('DATABASE_POOL_ERROR:', err.message);
      throw err;
    }
  }
  return pool;
};

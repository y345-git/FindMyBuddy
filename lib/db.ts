import { createPool, Pool, PoolOptions } from 'mysql2/promise';

let pool: Pool | undefined;

declare global {
  var mysqlGlobal: Pool | undefined;
}

export const getDb = () => {
  if (!pool) {
    if (process.env.NODE_ENV === 'production' && global.mysqlGlobal) {
      pool = global.mysqlGlobal;
      return pool;
    }

    const host = process.env.MYSQL_HOST;
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;
    const port = process.env.MYSQL_PORT || '3306';
    const useSsl = process.env.MYSQL_SSL === 'true';

    // Log connection attempt (without password)
    console.log(`Initializing DB connection to ${host}:${port} User: ${user} DB: ${database}`);

    if (!host || !user || !database) {
      throw new Error(`Database configuration missing. Required: host, user, database.`);
    }

    try {
      const config: PoolOptions = {
        host,
        user,
        password,
        database,
        port: parseInt(port),
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,
        connectTimeout: 20000, // Increased timeout for serverless cold starts
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      };

      // Only add SSL if explicitly requested
      if (useSsl) {
        config.ssl = { rejectUnauthorized: false };
      }

      pool = createPool(config);

      if (process.env.NODE_ENV === 'production') {
        global.mysqlGlobal = pool;
      }

      console.log(`Connected to MySQL at ${host} (SSL: ${useSsl})`);
    } catch (err: any) {
      console.error('DATABASE_POOL_ERROR:', err.message);
      throw err;
    }
  }
  return pool;
};

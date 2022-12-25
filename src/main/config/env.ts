import env from 'env-var';
require('dotenv').config();


export const ENVIRONMENT = Object.freeze({
  server: {
    port: env.get('PORT').required().asPortNumber() || 3000,
    env: env.get('NODE_ENV').required().asString()
  },
  database:{
    host: env.get('DB_HOST').required().asString(),
    user: env.get('DB_USER').required().asString(),
    database: env.get('DB_NAME').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
    port: env.get('DB_PORT').required().asPortNumber()
  }
});

 
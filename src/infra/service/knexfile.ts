import type { Knex } from "knex";
import { ENVIRONMENT } from "@/main/config";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: ENVIRONMENT.database.host,
      user: ENVIRONMENT.database.user,
      database: ENVIRONMENT.database.database,
      password: ENVIRONMENT.database.password,
      port: ENVIRONMENT.database.port,
      ssl: ENVIRONMENT.database.ssl ? { rejectUnauthorized: false } : false
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "migrations",
      directory: '../../../migrations'
    }
  }
};

module.exports = config;

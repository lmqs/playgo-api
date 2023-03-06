import env from 'env-var'
import dotenv from 'dotenv'
dotenv.config()

export const ENVIRONMENT = Object.freeze({
  server: {
    port: env.get('PORT').required().asPortNumber(),
    env: env.get('NODE_ENV').required().asString(),
    secret: env.get('SECRET').required().asString()
  },
  database: {
    host: env.get('DB_HOST').required().asString(),
    user: env.get('DB_USER').required().asString(),
    database: env.get('DB_NAME').required().asString(),
    password: env.get('DB_PASSWORD').required().asString(),
    port: env.get('DB_PORT').required().asPortNumber()
  },
  rabbit: {
    host: env.get('RABBITMQ_HOST').required().asString(),
    port: env.get('RABBITMQ_PORT').required().asPortNumber(),
    user: env.get('RABBITMQ_USER').required().asString(),
    password: env.get('RABBITMQ_PASSWORD').required().asString(),
    exchangeSignup: env.get('RABBITMQ_EXCHANGE_SIGNUP').asString(),
    routingKeySignup: env.get('RABBITMQ_ROUTINGKEY_SIGNUP').asString()
  }
})

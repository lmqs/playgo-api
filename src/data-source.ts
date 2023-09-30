import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { ENVIRONMENT } from './main/config'

const { database, host, password, port, user } = ENVIRONMENT.database
export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username: user,
  password,
  database,
  synchronize: false,
  logging: true,
  // eslint-disable-next-line n/no-path-concat
  entities: [__dirname + '/infra/entities/*.{js,ts}'],
  migrations: ['../src/migrations/*.{js,ts}'],
  subscribers: []
})

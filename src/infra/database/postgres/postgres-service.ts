import { ENVIRONMENT } from '@/main/config'
import { DatabaseClient } from '@/infra/database/protocols/database-client'
import { Client, QueryResult } from 'pg'

export class PostgresService implements DatabaseClient {
  private static instance: PostgresService
  private readonly client: Client

  constructor () {
    this.client = new Client({
      host: ENVIRONMENT.database.host,
      user: ENVIRONMENT.database.user,
      database: ENVIRONMENT.database.database,
      password: ENVIRONMENT.database.password,
      port: ENVIRONMENT.database.port,
      ssl: ENVIRONMENT.database.ssl ? { rejectUnauthorized: false } : false
    })
  }

  static getInstance (): PostgresService {
    if (!PostgresService.instance) {
      PostgresService.instance = new PostgresService()
    }
    return PostgresService.instance
  }

  async connect (): Promise<void> {
    try {
      await this.client.connect()
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async exec (query: string): Promise<QueryResult<any>> {
    try {
      return await this.client.query(query)
    } catch (error) {
      return await Promise.reject(error)
    }
  }
}

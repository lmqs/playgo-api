/* eslint-disable @typescript-eslint/no-base-to-string */
import { Reader, Writer } from '../protocols/database'
import { PostgresService } from './postgres-service'
import Knex from 'knex'

export abstract class BaseRepository<T, U> implements Reader<T>, Writer<T, U> {
  constructor (
    public readonly tableName: string,
    private readonly db: PostgresService = PostgresService.getInstance(),
    private readonly knex = Knex({ client: 'pg' })
  ) {}

  async findOne (id: string): Promise<T> {
    const query = this.knex(this.tableName)
      .select('*')
      .where('id', id)
      .toString()
    const result = await this.runSql(query)
    return result[0]
  }

  async create (payload: T): Promise<U> {
    const query = this.knex(this.tableName)
      .insert(payload)
      .returning('*')
      .toString()
    const result = await this.runSql(query)
    return result[0]
  }

  async runSql (query: string): Promise<any> {
    const result = await this.db.exec(query)
    return result.rows
  }
}

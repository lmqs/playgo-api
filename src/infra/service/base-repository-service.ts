/* eslint-disable @typescript-eslint/no-base-to-string */
import Knex from 'knex'
import { Reader, Writer } from '@/infra/database/protocols/database'
import { PostgresService } from './postgres-service'

export abstract class BaseRepository<T, U> implements Reader<U>, Writer<T, U> {
  constructor (
    public readonly tableName: string,
    private readonly db: PostgresService = PostgresService.getInstance(),
    private readonly knex = Knex({ client: 'pg' })
  ) {}

  async findOne (field: string, value: string): Promise<U> {
    const query = this.knex(this.tableName)
      .select('*')
      .where(field, value)
      .toString()
    const result = await this.runSql(query)
    return result[0]
  }

  async findGeneric (whereFieldsAndValues: any): Promise<U[]> {
    const query = this.knex(this.tableName)
      .select('*')
      .where(whereFieldsAndValues)
      .toString()
    const result = await this.runSql(query)
    return result
  }

  async findAll (): Promise<U[]> {
    const query = this.knex(this.tableName)
      .select('*')
      .toString()
    const result = await this.runSql(query)
    return result
  }

  async create (payload: T): Promise<U> {
    const query = this.knex(this.tableName)
      .insert(payload)
      .returning('*')
      .toString()
    const result = await this.runSql(query)
    return result[0]
  }

  async update (payload: any, whereFields: any): Promise<U> {
    const query = this.knex(this.tableName)
      .update(payload)
      .where(whereFields)
      .returning('*')
      .toString()
    const result = await this.runSql(query)
    return result[0]
  }

  async delete (id: string): Promise<void> {
    const query = this.knex(this.tableName)
      .where('id', id)
      .del()
      .toString()
    await this.runSql(query)
  }

  async runSql (query: string): Promise<any> {
    const result = await this.db.exec(query)
    return result.rows
  }
}
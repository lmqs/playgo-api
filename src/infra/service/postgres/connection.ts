import { DataSource, Repository, ObjectLiteral, EntityTarget, QueryRunner } from 'typeorm'

export class PgConnection {
  private connection: DataSource
  private static instance?: PgConnection
  private query?: QueryRunner

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async connect (dataSource: DataSource): Promise<DataSource> {
    if (!this.connection) {
      this.connection = await dataSource.initialize()
    }
    return this.connection
  }

  async disconnect (): Promise<void> {
    if (this.connection === undefined) throw new Error('Connection Not Found')
    await this.connection.destroy()
    this.query = undefined
  }

  async openTransaction (): Promise<void> {
    if (this.connection === undefined) throw new Error('Connection Not Found')
    this.query = this.connection.createQueryRunner()
    await this.query.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    if (this.query === undefined) throw new Error('Transaction Not Found')
    await this.query.release()
  }

  async commit (): Promise<void> {
    if (this.query === undefined) throw new Error('Transaction Not Found')
    await this.query.commitTransaction()
  }

  async rollback (): Promise<void> {
    if (this.query === undefined) throw new Error('Transaction Not Found')
    await this.query.rollbackTransaction()
  }

  getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity> {
    if (!this.connection) throw new Error('Connection Not Found')
    if (this.query !== undefined) return this.query.manager.getRepository(entity)
    return this.connection.getRepository(entity)
  }
}

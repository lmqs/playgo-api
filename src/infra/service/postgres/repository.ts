
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { PgConnection } from './connection'

export abstract class PgRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}

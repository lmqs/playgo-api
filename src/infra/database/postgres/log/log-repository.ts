import { AddLog } from '@/domain/usecases/log/add-log'
import { LogErrorRepository } from '@/data/protocols/db/account'
import { BaseRepository } from '@/infra/database/postgres/base-repository'

export class LogPostgresRepository extends BaseRepository<AddLog, any> implements LogErrorRepository {
  constructor (
    public readonly tableName: string = 'errors'
  ) {
    super(tableName)
  }

  async logError (stack: string): Promise<void> {
    await this.create({ stack })
  }
}

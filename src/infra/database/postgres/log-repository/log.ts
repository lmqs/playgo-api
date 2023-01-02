import { AddLog } from 'domain/usecases/add-log'
import { LogErrorRepository } from '../../../../data/usescases/add-account/protocols/log-error-repository'
import { BaseRepository } from '../base-repository'

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

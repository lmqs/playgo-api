import { AddAccountRepository } from 'data/usescases/add-account/db-add-account-protocols'
import { AccountModel } from './../../../../domain/models/account'

import { AddAccountModel } from 'domain/usecases/add-account'
import { BaseRepository } from '../base-repository'

export class AccountPostgresRepository extends BaseRepository<AddAccountModel, AccountModel> implements AddAccountRepository {
  constructor (
    public readonly tableName: string = 'users'
  ) {
    super(tableName)
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const result = await this.create(accountData)
    return result
  }
}

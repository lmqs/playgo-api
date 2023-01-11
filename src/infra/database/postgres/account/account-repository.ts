import { AddAccountRepository } from 'data/usescases/add-account/db-add-account-protocols'
import { AccountModel } from '../../../../domain/models/account'

import { AddAccountModel } from 'domain/usecases/add-account'
import { BaseRepository } from '../base-repository'
import { LoadAccountByUserRepository, UpdateAccessTokenRepository } from 'data/usescases/protocols/db/account'

export class AccountPostgresRepository extends BaseRepository<AddAccountModel, AccountModel>
  implements AddAccountRepository, LoadAccountByUserRepository, UpdateAccessTokenRepository {
  constructor (
    public readonly tableName: string = 'users'
  ) {
    super(tableName)
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const result = await this.create(accountData)
    return result
  }

  async loadByUser (user: string): Promise<AccountModel | undefined> {
    const result = await this.findOne('user', user)
    return result
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    await this.update({ accessToken: token }, { id })
  }
}

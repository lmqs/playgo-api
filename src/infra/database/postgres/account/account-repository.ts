import { AccountModel } from '../../../../domain/models/account'

import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { BaseRepository } from '../base-repository'
import { AddAccountRepository, LoadAccountByUserRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository } from '../../../../data/usescases/protocols/db/account'

export class AccountPostgresRepository extends BaseRepository<AddAccountModel, AccountModel>
  implements AddAccountRepository, LoadAccountByUserRepository, UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
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

  async loadByToken (token: string, role?: string | undefined): Promise<AccountModel | undefined> {
    const account = await this.findGeneric({ accessToken: token, role })
    if (account.length) {
      return account[0]
    }
  }
}

import { AccountModel } from '../../../../domain/models/account'

import { AddAccountParams } from '../../../../domain/usecases/account/add-account'
import { BaseRepository } from '../base-repository'
import { AddAccountRepository, LoadAccountByUserRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository } from '../../../../data/protocols/db/account'

export class AccountPostgresRepository extends BaseRepository<AddAccountParams, AccountModel>
  implements AddAccountRepository, LoadAccountByUserRepository, UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
  constructor (
    public readonly tableName: string = 'users'
  ) {
    super(tableName)
  }

  async add (accountData: AddAccountParams): Promise<AccountModel> {
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

  async loadByToken (token: string, role?: string): Promise<AccountModel | undefined> {
    const whereFields = { accessToken: token }
    Object.assign(whereFields, role ? { role } : {})

    const account = await this.findGeneric(whereFields)
    if (account.length) {
      return account[0]
    }
  }
}

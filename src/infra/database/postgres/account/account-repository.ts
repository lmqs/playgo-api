import { AccountModel } from '@/domain/models/account'
import { BaseRepository } from '@/infra/database/postgres/base-repository'
import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository } from '@/data/protocols/db/account'

export class AccountPostgresRepository extends BaseRepository<AddAccountRepository.Params, AccountModel>
  implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
  constructor (
    public readonly tableName: string = 'users'
  ) {
    super(tableName)
  }

  async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const result = await this.create(accountData)
    return result
  }

  async loadByEmail (email: string): Promise<AccountModel | undefined> {
    const result = await this.findOne('email', email)
    return result
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    await this.update({ accessToken: token }, { id })
  }

  async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result | undefined> {
    const whereFields = { accessToken: token }
    Object.assign(whereFields, role ? { role } : {})

    const account = await this.findGeneric(whereFields)
    if (account.length) {
      return account[0]
    }
  }
}

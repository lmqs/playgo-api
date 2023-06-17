import { AccountModel } from '@/domain/models/account'
import { BaseRepository } from '@/infra/database/postgres/base-repository'
import { IAccountRepository, dataModelToDbModelMapCategory } from '@/data/protocols/db'
import { InputDbAccountModel, OutputDbAccountModel, dbModelToDataModelMapCategory } from '@/data/models/db-account'

export class AccountPostgresRepository extends BaseRepository<InputDbAccountModel, OutputDbAccountModel> implements IAccountRepository {
  constructor (public readonly tableName: string = 'users') {
    super(tableName)
  }

  async add (accountData: IAccountRepository.AddParams): Promise<IAccountRepository.Result> {
    const result = await this.create(dataModelToDbModelMapCategory(accountData))
    return dbModelToDataModelMapCategory(result)
  }

  async loadByEmail (email: string): Promise<AccountModel | undefined> {
    const result = await this.findOne('email', email)
    return dbModelToDataModelMapCategory(result)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    await this.update({ access_token: token }, { id })
  }

  async loadByToken (token: string, role?: string): Promise<IAccountRepository.Result | undefined> {
    const whereFields = { access_token: token }
    Object.assign(whereFields, role ? { role } : {})

    const account = await this.findGeneric(whereFields)
    return dbModelToDataModelMapCategory(account[0])
  }

  async updateData (accountData: IAccountRepository.UpdateParams): Promise<IAccountRepository.Result> {
    const result = await this.update(dataModelToDbModelMapCategory(accountData), { id: accountData.id })
    return dbModelToDataModelMapCategory(result)
  }

  async loadById (id: string): Promise<AccountModel | undefined> {
    const result = await this.findOne('id', id)
    return dbModelToDataModelMapCategory(result)
  }
}

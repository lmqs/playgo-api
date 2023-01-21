import { LoadAccountByUserRepository } from '../../protocols/db/account'
import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByUserRepository: LoadAccountByUserRepository

  ) { }

  async add (accountData: AddAccountModel): Promise<AccountModel | undefined> {
    const account = await this.loadAccountByUserRepository.loadByUser(accountData.user)
    if (!account) {
      const passwordHashed = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: passwordHashed }))
      return newAccount
    }
  }
}

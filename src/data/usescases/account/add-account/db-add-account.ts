import { LoadAccountByUserRepository } from '@/data/usescases/account/authentication/db-authentication-protocols'
import { AddAccount, AddAccountParams, AccountModel, Hasher, AddAccountRepository } from '@/data/usescases/account/add-account/db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByUserRepository: LoadAccountByUserRepository

  ) { }

  async add (accountData: AddAccountParams): Promise<AccountModel | undefined> {
    const account = await this.loadAccountByUserRepository.loadByUser(accountData.user)
    if (!account) {
      const passwordHashed = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: passwordHashed }))
      return newAccount
    }
  }
}

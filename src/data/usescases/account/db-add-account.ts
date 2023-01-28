import { AddAccount, Hasher, AddAccountRepository, LoadAccountByUserRepository } from '@/data/usescases/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByUserRepository: LoadAccountByUserRepository

  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result | undefined> {
    const account = await this.loadAccountByUserRepository.loadByUser(accountData.user)
    if (!account) {
      const passwordHashed = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: passwordHashed }))
      return newAccount
    }
  }
}

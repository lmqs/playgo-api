import { AddAccount, Hasher, AddAccountRepository, LoadAccountByUserRepository } from '@/data/usescases/account'
import { EmailInUseError } from '@/presentation/errors'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByUserRepository: LoadAccountByUserRepository

  ) { }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result | Error > {
    const account = await this.loadAccountByUserRepository.loadByUser(accountData.user)
    if (account) return new EmailInUseError()

    const passwordHashed = await this.hasher.hash(accountData.password)
    return await this.addAccountRepository.add(Object.assign({}, accountData, { password: passwordHashed }))
  }
}

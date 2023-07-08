import { IAccountRepository } from '@/data/protocols/db'
import { ILoadAccountByName } from '@/domain/usecases/account/load-account-by-name'

export class DbLoadAccountByNameUseCase implements ILoadAccountByName {
  constructor (
    private readonly accountRepository: IAccountRepository
  ) {}

  async loadByName (name: string): Promise<ILoadAccountByName.Result[]> {
    const accounts = await this.accountRepository.loadByName(name)
    return accounts.map((account) => {
      const { accessToken, password, role, deleted, ...accountObj } = account
      return accountObj
    })
  }
}

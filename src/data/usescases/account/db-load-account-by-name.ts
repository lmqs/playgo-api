import { IAccountRepository } from '@/data/protocols/db'
import { ILoadAccountByName } from '@/domain/usecases/account/load-account-by-name'

export class DbLoadAccountByNameUseCase implements ILoadAccountByName {
  constructor (
    private readonly accountRepository: IAccountRepository
  ) {}

  async loadByName (name: string): Promise<any> {
    return await this.accountRepository.loadByName(name)
  }
}

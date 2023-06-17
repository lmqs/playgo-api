import { IAccountRepository } from '@/data/protocols/db'
import { ILoadAccountById } from '@/domain/usecases/account/load-account-by-id'

export class DbLoadAccountByIdUseCase implements ILoadAccountById {
  constructor (
    private readonly accountRepository: IAccountRepository
  ) {}

  async loadById (id: string): Promise<ILoadAccountById.Result | undefined> {
    return await this.accountRepository.loadById(id)
  }
}

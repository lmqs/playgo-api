import { IUpdateAccount } from '@/domain/usecases/account/update-account'
import { IAccountRepository } from '@/data/protocols/db'
import { EmailInUseError } from '@/presentation/errors'

export class DbUpdateAccountUseCase implements IUpdateAccount {
  constructor (private readonly accountRepository: IAccountRepository) {}

  async update (accountParams: IUpdateAccount.Params): Promise<IUpdateAccount.Result > {
    const account = await this.accountRepository.loadByEmail(accountParams.email)
    if (account && parseInt(account.id) !== parseInt(accountParams.id)) throw new EmailInUseError()

    return await this.accountRepository.updateData(accountParams)
  }
}

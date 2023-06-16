import { Hasher } from '@/data/protocols/criptography'
import { IAccountRepository } from '@/data/protocols/db'
import { IAddAccount } from '@/domain/usecases/account/add-account'
import RabbitmqService from '@/infra/queue/rabbitmq-service'
import { ENVIRONMENT } from '@/main/config'
import { EmailInUseError } from '@/presentation/errors'

export class DbAddAccountUseCase implements IAddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly accountRepository: IAccountRepository,
    private readonly exchangeSignup = ENVIRONMENT.rabbit.exchangeSignup,
    private readonly routingKeySignup = ENVIRONMENT.rabbit.routingKeySignup
  ) { }

  async add (accountParams: IAddAccount.Params): Promise<IAddAccount.Result | Error > {
    const account = await this.accountRepository.loadByEmail(accountParams.email)
    if (account) throw new EmailInUseError()

    const passwordHashed = await this.hasher.hash(accountParams.password)
    const accountData = await this.accountRepository.add(Object.assign({}, accountParams, { password: passwordHashed }))

    try {
      if (this.exchangeSignup && this.routingKeySignup) {
        await RabbitmqService.getInstance().publishInExchange(this.exchangeSignup, this.routingKeySignup,
          JSON.stringify({ id: accountData.id.toString(), email: accountData.email })
        )
      }
    } catch (error) {
    }

    return accountData
  }
}

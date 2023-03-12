import { AddAccount, Hasher, AddAccountRepository, LoadAccountByUserRepository } from '@/data/usescases/account'
import RabbitmqService from '@/infra/queue/rabbitmq-service'
import { ENVIRONMENT } from '@/main/config'
import { EmailInUseError } from '@/presentation/errors'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByUserRepository: LoadAccountByUserRepository,
    private readonly exchangeSignup = ENVIRONMENT.rabbit.exchangeSignup,
    private readonly routingKeySignup = ENVIRONMENT.rabbit.routingKeySignup
  ) { }

  async add (accountParams: AddAccount.Params): Promise<AddAccount.Result | Error > {
    const account = await this.loadAccountByUserRepository.loadByUser(accountParams.user)
    if (account) return new EmailInUseError()

    const passwordHashed = await this.hasher.hash(accountParams.password)
    const accountData = await this.addAccountRepository.add(Object.assign({}, accountParams, { password: passwordHashed }))

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

import { IAuthentication } from '@/domain/usecases/authentication/authentication'
import { Encrypter, HashComparer } from '@/data/protocols/criptography'
import { IAccountRepository } from '@/data/protocols/db'

export class DbAuthenticationUseCase implements IAuthentication {
  constructor (
    private readonly accountRepository: IAccountRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: Encrypter
  ) {}

  async auth (authentication: IAuthentication.Params): Promise<IAuthentication.Result | undefined> {
    const account = await this.accountRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.accountRepository.updateAccessToken(account.id, accessToken)
        return {
          accessToken,
          name: account.name,
          isAdmin: account.role === 'admin'
        }
      }
    }
  }
}

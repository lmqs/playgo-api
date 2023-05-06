import { Authentication } from '@/domain/usecases/authentication/authentication'
import { Encrypter, HashComparer } from '@/data/protocols/criptography'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols/db/account'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByUserRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: Authentication.Params): Promise<Authentication.Result | undefined> {
    const account = await this.loadAccountByUserRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return {
          accessToken,
          name: account.name
        }
      }
    }
  }
}

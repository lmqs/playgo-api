import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer, TokenGenerator } from '../protocols/criptography'
import { UpdateAccessTokenRepository, LoadAccountByUserRepository } from '../protocols/db'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByUserRepository: LoadAccountByUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | undefined> {
    const account = await this.loadAccountByUserRepository.load(authentication.user)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return undefined
  }
}
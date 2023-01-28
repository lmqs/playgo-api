import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { LoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'
import { LoadAccountByTokenRepository } from '.'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result | undefined> {
    let token: string | undefined
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return undefined
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
  }
}

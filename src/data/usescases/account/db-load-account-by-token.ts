import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { IAccountRepository } from '@/data/protocols/db'
import { ILoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'

export class DbLoadAccountByTokenUseCase implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly accountRepository: IAccountRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<ILoadAccountByToken.Result | undefined> {
    let token: string | undefined
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return undefined
    }
    if (token) {
      return await this.accountRepository.loadByToken(accessToken, role)
    }
  }
}

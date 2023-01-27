import { LoadAccountByToken } from '../../../../domain/usecases/account/load-account-by-token'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { Decrypter } from '../../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | undefined> {
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

import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByUserRepository } from '../protocols/db/log-account-by-user-repository'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByUserRepository: LoadAccountByUserRepository) {
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByUserRepository.load(authentication.user)

    return ''
  }
}

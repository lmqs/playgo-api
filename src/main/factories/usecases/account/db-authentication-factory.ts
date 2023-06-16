import { DbAuthenticationUseCase } from '@/data/usescases/account/db-authentication'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { ENVIRONMENT } from '@/main/config/env'
import { IAuthentication } from '@/domain/usecases/authentication/authentication'

export const makeDbAuthentication = (): IAuthentication => {
  const accountRepository = new AccountPostgresRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(ENVIRONMENT.server.secret)
  return new DbAuthenticationUseCase(accountRepository, bcryptAdapter, jwtAdapter)
}

import { DbAuthentication } from '../../../../../data/usescases/account/authentication/db-authentication'
import { AccountPostgresRepository } from '../../../../../infra/database/postgres/account/account-repository'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { ENVIRONMENT } from '../../../../config/env'
import { Authentication } from '../../../../../domain/usecases/authentication/authentication'

export const makeDbAuthentication = (): Authentication => {
  const accountRepository = new AccountPostgresRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(ENVIRONMENT.server.secret)
  const updateAccessTokenRepository = new AccountPostgresRepository()
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, updateAccessTokenRepository)
}

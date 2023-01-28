import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { ENVIRONMENT } from '@/main/config/env'
import { DbLoadAccountByToken } from '@/data/usescases/account/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(ENVIRONMENT.server.secret)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPostgresRepository)
}

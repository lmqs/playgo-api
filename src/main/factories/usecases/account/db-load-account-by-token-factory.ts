import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { ENVIRONMENT } from '@/main/config/env'
import { ILoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { DbLoadAccountByTokenUseCase } from '@/data/usescases/account'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(ENVIRONMENT.server.secret)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbLoadAccountByTokenUseCase(jwtAdapter, accountPostgresRepository)
}

import { ILoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { DbLoadAccountByIdUseCase } from '@/data/usescases/account/db-load-account-by-id'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'

export const makeDbLoadAccountById = (): ILoadAccountById => {
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbLoadAccountByIdUseCase(accountPostgresRepository)
}

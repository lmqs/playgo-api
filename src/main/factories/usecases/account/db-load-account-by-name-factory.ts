import { ILoadAccountByName } from '@/domain/usecases/account/load-account-by-name'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { DbLoadAccountByNameUseCase } from '@/data/usescases/account/db-load-account-by-name'

export const makeDbLoadAccountByName = (): ILoadAccountByName => {
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbLoadAccountByNameUseCase(accountPostgresRepository)
}

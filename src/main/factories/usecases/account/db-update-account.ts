import { DbUpdateAccountUseCase } from '@/data/usescases/account/db-update-account'
import { IUpdateAccount } from '@/domain/usecases/account/update-account'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'

export const makeDbUpdateAccount = (): IUpdateAccount => {
  const accountPostgresRepository = new AccountPostgresRepository()

  return new DbUpdateAccountUseCase(accountPostgresRepository)
}

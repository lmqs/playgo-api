import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '
import { LoadRegistrationByCategoryIdUseCase } from '@/data/usescases/registrations/db-load-by-category-id'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'

export const makeLoadRegistrationByCategoryIdUseCase = (): ILoadRegistrationByCategoryId => {
  const registrationsAthleteRepository = new RegistrationsAthletePostgresRepository()
  const accountRepository = new AccountPostgresRepository()
  return new LoadRegistrationByCategoryIdUseCase(registrationsAthleteRepository, accountRepository)
}

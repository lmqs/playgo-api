import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { ILoadRegistrationById } from '@/domain/usecases/registration/load-registration-by-id'
import { LoadRegistrationByIdUseCase } from '@/data/usescases/registrations/db-load-by-id-registration'

export const makeLoadRegistrationsByIdUseCase = (): ILoadRegistrationById => {
  const registrationsRepository = new RegistrationsPostgresRepository()
  return new LoadRegistrationByIdUseCase(registrationsRepository)
}

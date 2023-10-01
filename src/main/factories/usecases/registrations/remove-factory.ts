import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { IRemoveRegistrationUseCase } from '@/domain/usecases/registration/remove'
import { RemoveRegistrationUseCase } from '@/data/usescases/registrations/db-remove'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'

export const makeRemoveRegistrationsUseCase = (): IRemoveRegistrationUseCase => {
  const registrationsRepository = new RegistrationsPostgresRepository()
  const registrationsAthleteRepository = new RegistrationsAthletePostgresRepository()
  return new RemoveRegistrationUseCase(registrationsRepository, registrationsAthleteRepository)
}

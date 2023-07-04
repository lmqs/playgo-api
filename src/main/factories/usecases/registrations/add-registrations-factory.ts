import { IAddRegistrations } from '@/domain/usecases/registration/add-registrations'
import { AddRegistrationsUseCase } from '@/data/usescases/registrations/db-add-registrations'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import { RegistrationsWaitingPostgresRepository } from '@/infra/database/postgres/registrations/registrations-waiting-repository'
import { RegistrationsAthleteWaitingPostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-waiting-repository'

export const makeAddRegistrationsUseCase = (): IAddRegistrations => {
  const categoryRepository = new CategoryPostgresRepository()
  const tournamentRepository = new TournamentPostgresRepository()
  const accountRepository = new AccountPostgresRepository()

  const registrationsRepository = new RegistrationsPostgresRepository()
  const registrationsAthleteRepository = new RegistrationsAthletePostgresRepository()
  const registrationsWaitingRepository = new RegistrationsWaitingPostgresRepository()
  const registrationsAthleteWaitingRepository = new RegistrationsAthleteWaitingPostgresRepository()

  return new AddRegistrationsUseCase(
    categoryRepository, tournamentRepository, accountRepository,
    registrationsRepository, registrationsAthleteRepository, registrationsWaitingRepository, registrationsAthleteWaitingRepository
  )
}

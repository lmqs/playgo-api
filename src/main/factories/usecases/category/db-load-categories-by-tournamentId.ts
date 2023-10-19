
import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournament-id'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { DbLoadCategoriesUseCase } from '@/data/usescases/category'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'

export const makeDbLoadCategories = (): ILoadCategoriesByTournamentId => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const registrationsPostgresRepository = new RegistrationsPostgresRepository()
  const registrationsAthletePostgresRepository = new RegistrationsAthletePostgresRepository()

  return new DbLoadCategoriesUseCase(categoryPostgresRepository, registrationsPostgresRepository, registrationsAthletePostgresRepository)
}


import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournament-id'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { DbLoadCategoriesUseCase } from '@/data/usescases/category'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'

export const makeDbLoadCategories = (): ILoadCategoriesByTournamentId => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const registrationsPostgresRepository = new RegistrationsPostgresRepository()
  return new DbLoadCategoriesUseCase(categoryPostgresRepository, registrationsPostgresRepository)
}

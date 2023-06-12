
import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournamentId'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { DbLoadCategoriesUseCase } from '@/data/usescases/category'

export const makeDbLoadCategories = (): ILoadCategoriesByTournamentId => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbLoadCategoriesUseCase(categoryPostgresRepository)
}

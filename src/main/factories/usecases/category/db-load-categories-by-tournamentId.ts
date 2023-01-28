
import { CategoryPostgresRepository } from '../../../../infra/database/postgres/category/category-repository'
import { DbLoadCategories } from '../../../../data/usescases/category/load-categories-by-tournamentId'
import { LoadCategoriesByTournamentId } from '../../../../domain/usecases/category/load-categories-by-tournamentId'

export const makeDbLoadCategories = (): LoadCategoriesByTournamentId => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbLoadCategories(categoryPostgresRepository)
}

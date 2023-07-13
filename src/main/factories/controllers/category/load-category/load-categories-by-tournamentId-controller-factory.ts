import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'
import { makeLoadCategoriesByTournamentIdValidation } from './load-categories-by-tournamentId-validation-factory'
import { makeDbLoadCategories } from '@/main/factories/usecases/category/db-load-categories-by-tournamentId'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LoadCategoriesByTournamentIdController } from '@/presentation/controllers/category/load-category-by-tournamentId-controller'

export const makeLoadCategoriesByTournamentIdController = (): Controller => {
  const addCategoryController = new LoadCategoriesByTournamentIdController(
    makeLoadCategoriesByTournamentIdValidation(), makeDbLoadCategories()
  )
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addCategoryController, logPostgresRepository)
}

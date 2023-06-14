import { Controller } from '@/presentation/protocols'
import { UpdateCategoryController } from '@/presentation/controllers/category/update-category-controller'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeUpdateCategoryValidation } from './update-category-validation-factory'
import { makeDbUpdateCategory } from '@/main/factories/usecases/category/db-update-category'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeUpdateCategoryController = (): Controller => {
  const updateCategoryController = new UpdateCategoryController(makeUpdateCategoryValidation(), makeDbUpdateCategory())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(updateCategoryController, logPostgresRepository)
}

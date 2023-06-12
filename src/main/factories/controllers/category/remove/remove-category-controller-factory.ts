import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeRemoveCategoryValidation } from './remove-category-validation-factory'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeDbRemoveCategory } from '@/main/factories/usecases/category/db-remove-category'
import { RemoveCategoryController } from '@/presentation/controllers/category/remove-category-controller'

export const makeRemoveCategoryController = (): Controller => {
  const removeCategoryController = new RemoveCategoryController(makeRemoveCategoryValidation(), makeDbRemoveCategory())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(removeCategoryController, logPostgresRepository)
}

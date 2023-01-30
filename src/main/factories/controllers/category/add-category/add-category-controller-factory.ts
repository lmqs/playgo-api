import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeAddCategoryValidation } from './add-category-validation-factory'
import { AddCategoryController } from '@/presentation/controllers/category/add-category-controller'
import { makeDbAddCategory } from '@/main/factories/usecases/category/db-add-category'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeAddCategoryController = (): Controller => {
  const addCategoryController = new AddCategoryController(makeAddCategoryValidation(), makeDbAddCategory())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addCategoryController, logPostgresRepository)
}

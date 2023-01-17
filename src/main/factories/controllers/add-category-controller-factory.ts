import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { LogPostgresRepository } from '../../../infra/database/postgres/log/log-repository'
import { makeAddCategoryValidation } from './add-category-validation-factory'
import { makeDbAddCategory } from '../usecases/add-category/db-add-category'
import { AddCategoryController } from '../../../presentation/controllers/category/add-category-controller'

export const makeAddCategoryController = (): Controller => {
  const addCategoryController = new AddCategoryController(makeAddCategoryValidation(), makeDbAddCategory())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addCategoryController, logPostgresRepository)
}

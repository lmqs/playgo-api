import { RemoveCategoryUseCase } from '@/data/usescases/category'
import { IRemoveCategory } from '@/domain/usecases/category/remove-category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'

export const makeDbRemoveCategory = (): IRemoveCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new RemoveCategoryUseCase(categoryPostgresRepository)
}

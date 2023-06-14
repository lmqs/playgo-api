
import { ILoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { DbLoadCategoryByIdUseCase } from '@/data/usescases/category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'

export const makeDbLoadCategoryById = (): ILoadCategoryById => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbLoadCategoryByIdUseCase(categoryPostgresRepository)
}

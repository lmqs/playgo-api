import { AddCategoryUseCase } from '@/data/usescases/category/db-add-category'
import { IAddCategory } from '@/domain/usecases/category/add-category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'

export const makeDbAddCategory = (): IAddCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new AddCategoryUseCase(categoryPostgresRepository, categoryPostgresRepository)
}

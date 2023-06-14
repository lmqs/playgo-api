
import { UpdateCategoryUseCase } from '@/data/usescases/category'
import { IUpdateCategory } from '@/domain/usecases/category/update-category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'

export const makeDbUpdateCategory = (): IUpdateCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new UpdateCategoryUseCase(categoryPostgresRepository, categoryPostgresRepository)
}

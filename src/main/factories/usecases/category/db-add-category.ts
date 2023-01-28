import { DbAddCategory } from '@/data/usescases/category/db-add-category'
import { AddCategory } from '@/domain/usecases/category/add-category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'

export const makeDbAddCategory = (): AddCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  return new DbAddCategory(categoryPostgresRepository, categoryPostgresRepository)
}

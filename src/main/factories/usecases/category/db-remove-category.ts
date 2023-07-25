import { RemoveCategoryUseCase } from '@/data/usescases/category'
import { IRemoveCategory } from '@/domain/usecases/category/remove-category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'

export const makeDbRemoveCategory = (): IRemoveCategory => {
  const categoryPostgresRepository = new CategoryPostgresRepository()
  const registrationsRepository = new RegistrationsPostgresRepository()
  return new RemoveCategoryUseCase(categoryPostgresRepository, registrationsRepository)
}

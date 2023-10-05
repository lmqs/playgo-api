
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadCategoryById } from '@/main/factories/usecases/category/db-load-category-by-id'
import { CategoryDatabaseValidation } from '@/infra/validation/database/category-database-validation'

export const makeAddRegistrationsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['categoryId']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  const dbLoadCategoryById = makeDbLoadCategoryById()
  validations.push(new CategoryDatabaseValidation(dbLoadCategoryById, 'categoryId'))

  return new ValidationComposite(validations)
}

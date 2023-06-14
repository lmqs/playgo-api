
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { CategoryDatabaseValidation } from '@/presentation/validation/database/category-database-validation'
import { makeDbLoadCategoryById } from '@/main/factories/usecases/category/db-load-category-by-id'

export const makeUpdateCategoryValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['id', 'description']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  const dbLoadTournamentById = makeDbLoadCategoryById()
  validations.push(new CategoryDatabaseValidation(dbLoadTournamentById, 'id'))
  return new ValidationComposite(validations)
}

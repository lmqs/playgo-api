
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeAddCategoryValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['description', 'tournamentId']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

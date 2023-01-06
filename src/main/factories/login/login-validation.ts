
import { RequiredFieldValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['user', 'password']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

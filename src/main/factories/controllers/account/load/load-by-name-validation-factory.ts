import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'

export const makeLoadAccountByNameValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

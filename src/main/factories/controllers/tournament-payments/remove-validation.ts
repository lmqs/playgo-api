
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeRemoveTournamentPaymentsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['id']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

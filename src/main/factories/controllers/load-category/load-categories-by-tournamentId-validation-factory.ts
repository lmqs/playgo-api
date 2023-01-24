
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
import { Validation } from '../../../../presentation/protocols/validation'

export const makeLoadCategoriesByTournamentIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['tournamentId']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

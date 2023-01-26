
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

export const makeAddTournamentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['description', 'cityId', 'sportId', 'dtTournament', 'registrationStartDate', 'registrationFinalDate']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

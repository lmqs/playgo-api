
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadSportById } from '@/main/factories/usecases/sport/db-load-by-ids'
import { SportDatabaseValidation } from '@/validation/database'

export const makeAddTournamentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['description', 'cityId', 'sportId', 'dtTournament', 'registrationStartDate', 'registrationFinalDate']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  const loadSportByIdRepository = makeDbLoadSportById()
  validations.push(new SportDatabaseValidation(loadSportByIdRepository, 'sportId'))
  return new ValidationComposite(validations)
}

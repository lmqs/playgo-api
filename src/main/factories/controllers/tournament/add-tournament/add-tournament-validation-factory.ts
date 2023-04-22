
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadSportById } from '@/main/factories/usecases/sport/db-load-by-ids'
import { CityDatabaseValidation, SportDatabaseValidation } from '@/presentation/validation/database'
import { makeDbLoadCityById } from '@/main/factories/usecases/city/db-load-by-id'

export const makeAddTournamentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['description', 'cityId', 'sportId', 'dtTournament', 'registrationStartDate', 'registrationFinalDate']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  const loadSportById = makeDbLoadSportById()
  validations.push(new SportDatabaseValidation(loadSportById, 'sportId'))

  const dbLoadCityById = makeDbLoadCityById()
  validations.push(new CityDatabaseValidation(dbLoadCityById, 'cityId'))

  return new ValidationComposite(validations)
}

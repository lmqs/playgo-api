
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadTournamentById } from '@/main/factories/usecases/tournament/db-load-tournament-by-id'
import { TournamentDatabaseValidation } from '@/presentation/validation/database/tournament-database-validation'

export const makeAddCategoryValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['description', 'tournamentId', 'numberAthletesRegistration']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  const dbLoadTournamentById = makeDbLoadTournamentById()
  validations.push(new TournamentDatabaseValidation(dbLoadTournamentById, 'tournamentId'))
  return new ValidationComposite(validations)
}

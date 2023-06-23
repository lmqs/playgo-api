
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadTournamentById } from '@/main/factories/usecases/tournament'
import { TournamentDatabaseValidation } from '@/infra/validation/database/tournament-database-validation'

export const makeRemoveTournamentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['id']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  const loadTournamentById = makeDbLoadTournamentById()
  validations.push(new TournamentDatabaseValidation(loadTournamentById, 'id'))

  return new ValidationComposite(validations)
}

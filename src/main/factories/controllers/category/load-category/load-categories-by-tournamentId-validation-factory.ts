
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadTournamentById } from '@/main/factories/usecases/tournament'
import { TournamentDatabaseValidation } from '@/presentation/validation/database/tournament-database-validation'

export const makeLoadCategoriesByTournamentIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['tournamentId']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  const loadTournamentById = makeDbLoadTournamentById()
  validations.push(new TournamentDatabaseValidation(loadTournamentById, 'tournamentId'))
  return new ValidationComposite(validations)
}

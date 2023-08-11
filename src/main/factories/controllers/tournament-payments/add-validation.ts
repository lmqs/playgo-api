
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadTournamentById } from '../../usecases/tournament'
import { TournamentDatabaseValidation } from '@/infra/validation/database'

export const makeAddTournamentPaymentsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['tournamentId', 'value', 'indexPayment']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  const loadTournamentById = makeDbLoadTournamentById()
  validations.push(new TournamentDatabaseValidation(loadTournamentById, 'tournamentId'))

  return new ValidationComposite(validations)
}


import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeDbLoadTournamentById } from '@/main/factories/usecases/tournament'
import { TournamentDatabaseValidation } from '@/infra/validation/database/tournament-database-validation'
import { TournamentSponsorDatabaseValidation } from '@/infra/validation/database/tournament-sponsor-database-validation'
import { makeLoadTournamentSponsorById } from '@/main/factories/usecases/tournament-sponsor'

export const makeUpdateTournamentSponsorValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['tournamentId', 'name', 'id']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  const loadTournamentById = makeDbLoadTournamentById()
  validations.push(new TournamentDatabaseValidation(loadTournamentById, 'tournamentId'))

  const loadTournamentSponsorById = makeLoadTournamentSponsorById()
  validations.push(new TournamentSponsorDatabaseValidation(loadTournamentSponsorById, 'id'))

  return new ValidationComposite(validations)
}

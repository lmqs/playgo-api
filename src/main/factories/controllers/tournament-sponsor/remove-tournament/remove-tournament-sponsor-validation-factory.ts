
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { TournamentSponsorDatabaseValidation } from '@/infra/validation/database/tournament-sponsor-database-validation'
import { makeLoadTournamentSponsorById } from '@/main/factories/usecases/tournament-sponsor'

export const makeRemoveTournamentSponsorValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['id']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  const loadById = makeLoadTournamentSponsorById()
  validations.push(new TournamentSponsorDatabaseValidation(loadById, 'id'))

  return new ValidationComposite(validations)
}

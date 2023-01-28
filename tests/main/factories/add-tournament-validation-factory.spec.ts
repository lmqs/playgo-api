import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddTournamentValidation } from '@/main/factories/controllers/tournament/add-tournament/add-tournament-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('makeAddCategoryValidation ', () => {
  test('Sould call ValidationComposite with all validations', () => {
    makeAddTournamentValidation()
    const validations: Validation[] = []
    const requiredFields = ['description', 'cityId', 'sportId', 'dtTournament', 'registrationStartDate', 'registrationFinalDate']

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

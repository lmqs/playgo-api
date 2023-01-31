import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddSportController } from '@/main/factories/controllers/sport/add-sport/add-sport-controller-factory'

jest.mock('@/validation/validators/validation-composite')

describe('makeAddSportValidation ', () => {
  test('Sould call ValidationComposite with all validations', () => {
    makeAddSportController()
    const validations: Validation[] = []
    const requiredFields = ['description']

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

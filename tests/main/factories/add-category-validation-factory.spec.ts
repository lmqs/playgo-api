import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeAddCategoryController } from '@/main/factories/controllers/category/add-category/add-category-controller-factory'

jest.mock('@/validation/validators/validation-composite')

describe('makeAddCategoryValidation ', () => {
  test('Sould call ValidationComposite with all validations', () => {
    makeAddCategoryController()
    const validations: Validation[] = []
    const requiredFields = ['description', 'tournamentId']

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

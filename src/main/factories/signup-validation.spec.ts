import { makeSignUpValidation } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignupValidation ', () => {
  test('Sould call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const requiredFields = ['name', 'user', 'password', 'passwordConfirmation', 'email', 'cityId', 'phoneNumber']

    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

import { CompareFieldsValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { EmailValidation } from '@/validation/validators/email-validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'user', 'password', 'passwordConfirmation', 'email', 'cityId', 'phoneNumber']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}

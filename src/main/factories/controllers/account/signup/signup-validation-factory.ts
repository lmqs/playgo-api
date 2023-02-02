import { Validation } from '@/presentation/protocols'
import { CompareFieldsValidation, RequiredFieldValidation, ValidationComposite, EmailValidation } from '@/validation/validators'
import { CityDatabaseValidation } from '@/validation/database'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { makeDbLoadCityById } from '@/main/factories/usecases/city/db-load-by-id'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'user', 'password', 'passwordConfirmation', 'email', 'cityId', 'phoneNumber']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  const dbLoadCityById = makeDbLoadCityById()
  validations.push(new CityDatabaseValidation(dbLoadCityById, 'cityId'))

  return new ValidationComposite(validations)
}

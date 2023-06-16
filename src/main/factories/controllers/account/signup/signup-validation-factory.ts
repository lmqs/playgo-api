import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite, EmailValidation } from '@/presentation/validation/validators'
import { CityDatabaseValidation } from '@/presentation/validation/database'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { makeDbLoadCityById } from '@/main/factories/usecases/city/db-load-by-id'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'gender', 'password', 'email', 'cityId', 'phoneNumber', 'dateBirthday']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  const dbLoadCityById = makeDbLoadCityById()
  validations.push(new CityDatabaseValidation(dbLoadCityById, 'cityId'))

  return new ValidationComposite(validations)
}

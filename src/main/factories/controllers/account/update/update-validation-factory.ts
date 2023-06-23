import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite, EmailValidation } from '@/presentation/validation/validators'
import { CityDatabaseValidation } from '@/infra/validation/database'
import { EmailValidatorAdapter } from '@/infra/validation/validators/email-validator-adapter'
import { makeDbLoadCityById } from '@/main/factories/usecases/city/db-load-by-id'
import { makeDbLoadAccountById } from '@/main/factories/usecases/account/db-load-account-by-id-factory'
import { AccountDatabaseValidation } from '@/infra/validation/database/account-database-validation'

export const makeUpdateAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'gender', 'email', 'cityId', 'phoneNumber', 'dateBirthday']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  const dbLoadCityById = makeDbLoadCityById()
  validations.push(new CityDatabaseValidation(dbLoadCityById, 'cityId'))

  const dbLoadAccountById = makeDbLoadAccountById()
  validations.push(new AccountDatabaseValidation(dbLoadAccountById, 'id'))

  return new ValidationComposite(validations)
}

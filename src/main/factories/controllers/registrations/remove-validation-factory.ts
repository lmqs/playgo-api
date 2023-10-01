
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols/validation'
import { RegistrationDatabaseValidation } from '@/infra/validation/database'
import { makeLoadRegistrationsByIdUseCase } from '../../usecases/registrations/load-by-id-registrations-factory'

export const makeRemoveRegistrationsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['id']

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }

  const dbLoadById = makeLoadRegistrationsByIdUseCase()
  validations.push(new RegistrationDatabaseValidation(dbLoadById, 'id'))

  return new ValidationComposite(validations)
}

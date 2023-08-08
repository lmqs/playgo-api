import { ILoadRegistrationById } from '@/domain/usecases/registration/load-registration-by-id'
import { RegistrationDatabaseValidation } from '@/infra/validation/database'
import { makeLoadRegistrationsByIdUseCase } from '@/main/factories/usecases/registrations/load-by-id-registrations-factory'
import { InvalidParamError } from '@/presentation/errors'

describe('RegistrationDatabaseValidation  UseCase', () => {
  let dbLoadRegistrationIdStub: ILoadRegistrationById
  beforeEach(() => {
    dbLoadRegistrationIdStub = makeLoadRegistrationsByIdUseCase()
  })

  test('Should return undefined if loadById return registration valid', async () => {
    jest.spyOn(dbLoadRegistrationIdStub, 'loadById').mockResolvedValueOnce({
      id: '1',
      categoryId: '1',
      registrationDate: '10/10/2023'
    })
    const validation = new RegistrationDatabaseValidation(dbLoadRegistrationIdStub, 'id')
    const result = await validation.validate({ id: '1' })
    expect(result).toBeUndefined()
    expect(dbLoadRegistrationIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should return InvalidParamError if loadById return undefined', async () => {
    jest.spyOn(dbLoadRegistrationIdStub, 'loadById').mockResolvedValueOnce(undefined)
    const validation = new RegistrationDatabaseValidation(dbLoadRegistrationIdStub, 'id')

    const result = await validation.validate({ id: '1' })
    expect(result).toEqual(new InvalidParamError('id'))
    expect(dbLoadRegistrationIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should throw if loadById throws', async () => {
    jest.spyOn(dbLoadRegistrationIdStub, 'loadById').mockImplementation(() => {
      throw new Error()
    })
    const validation = new RegistrationDatabaseValidation(dbLoadRegistrationIdStub, 'id')
    const promise = validation.validate({ id: '1' })
    await expect(promise).rejects.toThrow()
  })
})

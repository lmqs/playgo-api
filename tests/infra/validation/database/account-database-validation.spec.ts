import { ILoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { AccountDatabaseValidation } from '@/infra/validation/database'
import { makeDbLoadAccountById } from '@/main/factories/usecases/account/db-load-account-by-id-factory'
import { InvalidParamError } from '@/presentation/errors'

describe('AccountDatabaseValidation  UseCase', () => {
  let dbLoadAccountByIdStub: ILoadAccountById
  beforeEach(() => {
    dbLoadAccountByIdStub = makeDbLoadAccountById()
  })

  test('Should return undefined if loadById return account valid', async () => {
    jest.spyOn(dbLoadAccountByIdStub, 'loadById').mockResolvedValueOnce({
      id: '1',
      name: 'valid_name',
      gender: 'valid_gender',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      dateBirthday: '20/10/2020'
    })
    const validation = new AccountDatabaseValidation(dbLoadAccountByIdStub, 'id')
    const result = await validation.validate({ id: '1' })
    expect(result).toBeUndefined()
    expect(dbLoadAccountByIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should return InvalidParamError if loadById return undefined', async () => {
    jest.spyOn(dbLoadAccountByIdStub, 'loadById').mockResolvedValueOnce(undefined)
    const validation = new AccountDatabaseValidation(dbLoadAccountByIdStub, 'id')

    const result = await validation.validate({ id: '1' })
    expect(result).toEqual(new InvalidParamError('id'))
    expect(dbLoadAccountByIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should throw if loadById throws', async () => {
    jest.spyOn(dbLoadAccountByIdStub, 'loadById').mockImplementation(() => {
      throw new Error()
    })
    const validation = new AccountDatabaseValidation(dbLoadAccountByIdStub, 'id')
    const promise = validation.validate({ id: '1' })
    await expect(promise).rejects.toThrow()
  })
})

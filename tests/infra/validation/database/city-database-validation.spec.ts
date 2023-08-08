import { ILoadCityById } from '@/domain/usecases/city/load-city-by-id'
import { CityDatabaseValidation } from '@/infra/validation/database'
import { makeDbLoadCityById } from '@/main/factories/usecases/city/db-load-by-id'
import { InvalidParamError } from '@/presentation/errors'

describe('CityDatabaseValidation  UseCase', () => {
  let dbLoadCityIdStub: ILoadCityById
  beforeEach(() => {
    dbLoadCityIdStub = makeDbLoadCityById()
  })

  test('Should return undefined if load return city valid', async () => {
    jest.spyOn(dbLoadCityIdStub, 'load').mockResolvedValueOnce({
      id: '1',
      name: 'Aju',
      codeIbge: '1121',
      stateId: '1',
      area: '102222',
      deleted: false
    })
    const validation = new CityDatabaseValidation(dbLoadCityIdStub, 'id')
    const result = await validation.validate({ id: '1' })
    expect(result).toBeUndefined()
    expect(dbLoadCityIdStub.load).toHaveBeenCalledWith('1')
  })

  test('Should return InvalidParamError if load return undefined', async () => {
    jest.spyOn(dbLoadCityIdStub, 'load').mockResolvedValueOnce(undefined)
    const validation = new CityDatabaseValidation(dbLoadCityIdStub, 'id')

    const result = await validation.validate({ id: '1' })
    expect(result).toEqual(new InvalidParamError('id'))
    expect(dbLoadCityIdStub.load).toHaveBeenCalledWith('1')
  })

  test('Should throw if load throws', async () => {
    jest.spyOn(dbLoadCityIdStub, 'load').mockImplementation(() => {
      throw new Error()
    })
    const validation = new CityDatabaseValidation(dbLoadCityIdStub, 'id')
    const promise = validation.validate({ id: '1' })
    await expect(promise).rejects.toThrow()
  })
})

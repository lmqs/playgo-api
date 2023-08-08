import { LoadSportById } from '@/domain/usecases/sport'
import { SportDatabaseValidation } from '@/infra/validation/database'
import { makeDbLoadSportById } from '@/main/factories/usecases/sport/db-load-by-ids'
import { InvalidParamError } from '@/presentation/errors'

describe('SportDatabaseValidation  UseCase', () => {
  let dbLoadSportIdStub: LoadSportById
  beforeEach(() => {
    dbLoadSportIdStub = makeDbLoadSportById()
  })

  test('Should return undefined if loadById return sport valid', async () => {
    jest.spyOn(dbLoadSportIdStub, 'loadById').mockResolvedValueOnce({
      id: '1',
      description: 'soccer'
    })
    const validation = new SportDatabaseValidation(dbLoadSportIdStub, 'id')
    const result = await validation.validate({ id: '1' })
    expect(result).toBeUndefined()
    expect(dbLoadSportIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should return InvalidParamError if loadById return undefined', async () => {
    jest.spyOn(dbLoadSportIdStub, 'loadById').mockResolvedValueOnce(undefined)
    const validation = new SportDatabaseValidation(dbLoadSportIdStub, 'id')

    const result = await validation.validate({ id: '1' })
    expect(result).toEqual(new InvalidParamError('id'))
    expect(dbLoadSportIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should throw if loadById throws', async () => {
    jest.spyOn(dbLoadSportIdStub, 'loadById').mockImplementation(() => {
      throw new Error()
    })
    const validation = new SportDatabaseValidation(dbLoadSportIdStub, 'id')
    const promise = validation.validate({ id: '1' })
    await expect(promise).rejects.toThrow()
  })
})

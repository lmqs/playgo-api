import { ILoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { CategoryDatabaseValidation } from '@/infra/validation/database'
import { makeDbLoadCategoryById } from '@/main/factories/usecases/category/db-load-category-by-id'
import { InvalidParamError } from '@/presentation/errors'

describe('CategoryDatabaseValidation  UseCase', () => {
  let dbLoadCategoryIdStub: ILoadCategoryById
  beforeEach(() => {
    dbLoadCategoryIdStub = makeDbLoadCategoryById()
  })

  test('Should return undefined if loadById return category valid', async () => {
    jest.spyOn(dbLoadCategoryIdStub, 'loadById').mockResolvedValueOnce({
      id: '1',
      description: 'category A',
      tournamentId: '1',
      numberAthletes: '10',
      numberAthletesRegistration: '10'
    })
    const validation = new CategoryDatabaseValidation(dbLoadCategoryIdStub, 'id')
    const result = await validation.validate({ id: '1' })
    expect(result).toBeUndefined()
    expect(dbLoadCategoryIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should return InvalidParamError if loadById return undefined', async () => {
    jest.spyOn(dbLoadCategoryIdStub, 'loadById').mockResolvedValueOnce(undefined)
    const validation = new CategoryDatabaseValidation(dbLoadCategoryIdStub, 'id')

    const result = await validation.validate({ id: '1' })
    expect(result).toEqual(new InvalidParamError('id'))
    expect(dbLoadCategoryIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should throw if loadById throws', async () => {
    jest.spyOn(dbLoadCategoryIdStub, 'loadById').mockImplementation(() => {
      throw new Error()
    })
    const validation = new CategoryDatabaseValidation(dbLoadCategoryIdStub, 'id')
    const promise = validation.validate({ id: '1' })
    await expect(promise).rejects.toThrow()
  })
})

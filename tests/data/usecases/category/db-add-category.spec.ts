import { ICategoryRepository } from '@/data/protocols/db'
import { AddCategoryUseCase } from '@/data/usescases/category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { addCategoryIncompleteMock, addCategoryModelMock, categoryModelMock } from './category-mock'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('DbAddCategory UseCase', () => {
  let categoryRepo: ICategoryRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
  })

  test('Should call loadByDescriptionAndId with correct values', async () => {
    const loadSpy = jest.spyOn(categoryRepo, 'loadByDescriptionAndId')

    const addCategoryUseCase = new AddCategoryUseCase(categoryRepo, categoryRepo)

    await addCategoryUseCase.add(addCategoryModelMock)
    expect(loadSpy).toHaveBeenCalledWith('valid_description', 'valid_tournamentId')
  })

  test('Should throw ParamInUseError if LoadCategoryByDescriptionAndIdRepository not return empty', async () => {
    const addCategoryUseCase = new AddCategoryUseCase(categoryRepo, categoryRepo)

    jest.spyOn(categoryRepo, 'loadByDescriptionAndId').mockReturnValueOnce(Promise.resolve([categoryModelMock, categoryModelMock]))
    const promise = addCategoryUseCase.add(addCategoryModelMock)
    await expect(promise).rejects.toThrow(new ParamInUseError('description'))
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const addCategoryUseCase = new AddCategoryUseCase(categoryRepo, categoryRepo)
    jest.spyOn(categoryRepo, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = addCategoryUseCase.add(addCategoryModelMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should assign a default value to the numberAthletes field when not informed', async () => {
    jest.spyOn(categoryRepo, 'add').mockResolvedValueOnce(categoryModelMock)
    jest.spyOn(categoryRepo, 'loadByDescriptionAndId').mockResolvedValueOnce([])

    const addCategoryUseCase = new AddCategoryUseCase(categoryRepo, categoryRepo)
    const category = await addCategoryUseCase.add(addCategoryIncompleteMock)

    expect(category).toEqual({
      id: 'valid_id',
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes',
      numberAthletesRegistration: 'valid_numberAthletesRegistration',
      deleted: false,
      numberRegistration: 0
    })
    expect(categoryRepo.add).toHaveBeenCalledWith({ ...addCategoryIncompleteMock, numberAthletes: '20' })
  })

  test('Should return a category on success', async () => {
    jest.spyOn(categoryRepo, 'add').mockResolvedValueOnce(categoryModelMock)
    jest.spyOn(categoryRepo, 'loadByDescriptionAndId').mockResolvedValueOnce([])

    const addCategoryUseCase = new AddCategoryUseCase(categoryRepo, categoryRepo)
    const category = await addCategoryUseCase.add(addCategoryModelMock)

    expect(category).toEqual({
      id: 'valid_id',
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes',
      numberAthletesRegistration: 'valid_numberAthletesRegistration',
      deleted: false,
      numberRegistration: 0
    })
    expect(categoryRepo.add).toHaveBeenCalledWith({
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes',
      numberAthletesRegistration: 'valid_numberAthletesRegistration'
    })
  })
})

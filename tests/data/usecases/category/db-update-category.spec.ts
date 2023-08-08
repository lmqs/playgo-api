import { ICategoryRepository } from '@/data/protocols/db'
import { UpdateCategoryUseCase } from '@/data/usescases/category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { categoryModelMock } from './category-mock'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('DbUpdateCategory UseCase', () => {
  let categoryRepo: ICategoryRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('Should call loadByDescriptionAndId with correct values', async () => {
    const loadSpy = jest.spyOn(categoryRepo, 'loadByDescriptionAndId').mockResolvedValueOnce([])
    const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo, categoryRepo)

    await updateCategoryUseCase.update(categoryModelMock)
    expect(loadSpy).toHaveBeenCalledWith('valid_description', 'valid_tournamentId')
  })

  test('Should throw ParamInUseError if description is already in use', async () => {
    const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo, categoryRepo)

    jest.spyOn(categoryRepo, 'loadByDescriptionAndId').mockReturnValueOnce(Promise.resolve([categoryModelMock]))
    const promise = updateCategoryUseCase.update(categoryModelMock)
    await expect(promise).rejects.toThrow(new ParamInUseError('description'))
  })

  test('Should return a category on success update', async () => {
    jest.spyOn(categoryRepo, 'updateData').mockResolvedValueOnce(categoryModelMock)
    jest.spyOn(categoryRepo, 'loadByDescriptionAndId').mockResolvedValueOnce(Promise.resolve([]))

    const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo, categoryRepo)
    const category = await updateCategoryUseCase.update(categoryModelMock)

    expect(category).toEqual({
      id: 'valid_id',
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes',
      numberAthletesRegistration: 'valid_numberAthletesRegistration',
      deleted: false
    })
    expect(categoryRepo.updateData).toHaveBeenCalledWith({
      id: 'valid_id',
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes',
      numberAthletesRegistration: 'valid_numberAthletesRegistration',
      deleted: false
    })
  })

  test('Should throw if UpdateAccountRepository throws', async () => {
    jest.spyOn(categoryRepo, 'loadByDescriptionAndId').mockResolvedValueOnce(Promise.resolve([]))

    const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo, categoryRepo)
    jest.spyOn(categoryRepo, 'updateData').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = updateCategoryUseCase.update(categoryModelMock)
    await expect(promise).rejects.toThrow()
  })
})

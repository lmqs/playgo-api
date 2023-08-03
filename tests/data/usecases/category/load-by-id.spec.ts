import { ICategoryRepository } from '@/data/protocols/db'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { categoryModelMock } from './category-mock'
import { DbLoadCategoryByIdUseCase } from '@/data/usescases/category'

describe('DbLoadCategoryByIdUseCase UseCase', () => {
  let categoryRepo: ICategoryRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
  })

  test('Should return empty array if LoadCategoryByTournamentIdRepository return empty', async () => {
    const useCase = new DbLoadCategoryByIdUseCase(categoryRepo)
    jest.spyOn(categoryRepo, 'loadById').mockResolvedValueOnce(undefined)
    const category = await useCase.loadById('valid_tournamentId')

    expect(category).toBeUndefined()
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const useCase = new DbLoadCategoryByIdUseCase(categoryRepo)
    jest.spyOn(categoryRepo, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = useCase.loadById('valid_tournamentId')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a category on success', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockResolvedValueOnce(categoryModelMock)
    const useCase = new DbLoadCategoryByIdUseCase(categoryRepo)

    const category = await useCase.loadById('valid_tournamentId')
    expect(category).toEqual(categoryModelMock)
    expect(categoryRepo.loadById).toHaveBeenCalledWith('valid_tournamentId')
  })
})

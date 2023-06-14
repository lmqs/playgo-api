import { ICategoryRepository } from '@/data/protocols/db'
import { DbLoadCategoriesUseCase } from '@/data/usescases/category/load-categories-by-tournamentId'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { categoryModelMock } from './category-mock'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('DbLoadCategories UseCase', () => {
  let categoryRepo: ICategoryRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
  })

  test('Should call LoadCategoryByTournamentIdRepository with correct values', async () => {
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo)

    const loadByTournamentIdSpy = jest.spyOn(categoryRepo, 'loadByTournamentId')

    await loadCategoriesUseCase.load('valid_tournamentId')
    expect(loadByTournamentIdSpy).toHaveBeenCalledWith('valid_tournamentId')
  })

  test('Should return empty array if LoadCategoryByTournamentIdRepository return empty', async () => {
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo)
    jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve([])
      })
    )
    const categories = await loadCategoriesUseCase.load('valid_tournamentId')

    expect(categories).toStrictEqual([])
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo)
    jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = loadCategoriesUseCase.load('valid_tournamentId')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an categories on Success', async () => {
    jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(Promise.resolve([categoryModelMock]))

    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo)

    const categories = await loadCategoriesUseCase.load('valid_tournamentId')
    expect(categories).toEqual([categoryModelMock])
  })
})

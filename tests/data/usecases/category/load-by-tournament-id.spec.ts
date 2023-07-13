import { ICategoryRepository } from '@/data/protocols/db'
import { DbLoadCategoriesUseCase } from '@/data/usescases/category/load-categories-by-tournament-id'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { categoryModelMock, categoryResultModelMock } from './category-mock'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'

describe('DbLoadCategories UseCase', () => {
  let categoryRepo: ICategoryRepository
  let registrationsRepo: IRegistrationsRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
    registrationsRepo = new RegistrationsPostgresRepository()
  })

  test('Should return empty array if LoadCategoryByTournamentIdRepository return empty', async () => {
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo, registrationsRepo)
    jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(new Promise((resolve) => { resolve([]) }))
    const categories = await loadCategoriesUseCase.load('valid_tournamentId')

    expect(categories).toStrictEqual([])
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo, registrationsRepo)
    jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = loadCategoriesUseCase.load('valid_tournamentId')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an categories on Success', async () => {
    const loadByTournamentIdSpy = jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(Promise.resolve([categoryModelMock]))
    const registrationsRepoSpy = jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve([]))
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo, registrationsRepo)

    const categories = await loadCategoriesUseCase.load('valid_tournamentId')
    expect(categories).toEqual(categoryResultModelMock)
    expect(loadByTournamentIdSpy).toHaveBeenCalledWith('valid_tournamentId')
    expect(registrationsRepoSpy).toHaveBeenCalledWith('valid_id')
  })
})

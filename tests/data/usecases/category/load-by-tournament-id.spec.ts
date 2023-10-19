import { ICategoryRepository, IRegistrationsAthleteRepository } from '@/data/protocols/db'
import { DbLoadCategoriesUseCase } from '@/data/usescases/category/load-categories-by-tournament-id'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { categoryModelMock, categoryResultModelMock } from './category-mock'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'

describe('DbLoadCategories UseCase', () => {
  let categoryRepo: ICategoryRepository
  let registrationsRepo: IRegistrationsRepository
  let registrationsAthleteRepo: IRegistrationsAthleteRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
    registrationsRepo = new RegistrationsPostgresRepository()
    registrationsAthleteRepo = new RegistrationsAthletePostgresRepository()
  })

  test('Should return empty array if LoadCategoryByTournamentIdRepository return empty', async () => {
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo, registrationsRepo, registrationsAthleteRepo)
    jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(new Promise((resolve) => { resolve([]) }))
    const categories = await loadCategoriesUseCase.load({ tournamentId: 'valid_tournamentId', accountId: '10' })

    expect(categories).toStrictEqual([])
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo, registrationsRepo, registrationsAthleteRepo)
    jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = loadCategoriesUseCase.load({ tournamentId: 'valid_tournamentId', accountId: '10' })
    await expect(promise).rejects.toThrow()
  })

  test('Should return a categories on success', async () => {
    const loadByTournamentIdSpy = jest.spyOn(categoryRepo, 'loadByTournamentId').mockReturnValueOnce(Promise.resolve([categoryModelMock]))
    const registrationsRepoSpy = jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve([]))
    const registrationsAthleteRepoSpy =
      jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser').mockReturnValueOnce(Promise.resolve([]))
    const loadCategoriesUseCase = new DbLoadCategoriesUseCase(categoryRepo, registrationsRepo, registrationsAthleteRepo)

    const categories = await loadCategoriesUseCase.load({ tournamentId: 'valid_tournamentId', accountId: '10' })
    expect(categories).toEqual(categoryResultModelMock)
    expect(loadByTournamentIdSpy).toHaveBeenCalledWith('valid_tournamentId')
    expect(registrationsRepoSpy).toHaveBeenCalledWith('valid_id')
    expect(registrationsAthleteRepoSpy).toHaveBeenCalledWith({ athleteId: '10', categoryId: 'valid_id' })
  })
})

import { LoadCategoryByTournamentIdRepository } from '@/data/protocols/db/category'
import { DbLoadCategories } from '@/data/usescases/category/load-categories-by-tournamentId'
import { CategoryModel } from '@/domain/models/category'
import { LoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournamentId'

const makeFakeCategoriesModel = (): CategoryModel[] => {
  return [{
    id: 'valid_id',
    description: 'valid_description',
    tournamentId: 'valid_tournamentId',
    numberAthletes: 'valid_numberAthletes',
    deleted: true
  }]
}

type SutTypes = {
  sut: LoadCategoriesByTournamentId
  loadCategoryByTournamentIdRepositoryStub: LoadCategoryByTournamentIdRepository
}

const makeLoadCategoryByTournamentIdRepository = (): LoadCategoryByTournamentIdRepository => {
  class LoadCategoryByTournamentIdRepositoryStub implements LoadCategoryByTournamentIdRepository {
    async loadByTournamentId (id: string): Promise<LoadCategoryByTournamentIdRepository.Result | undefined> {
      return await new Promise(resolve => { resolve(makeFakeCategoriesModel()) })
    }
  }
  return new LoadCategoryByTournamentIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadCategoryByTournamentIdRepositoryStub = makeLoadCategoryByTournamentIdRepository()
  const sut = new DbLoadCategories(loadCategoryByTournamentIdRepositoryStub)
  return {
    sut,
    loadCategoryByTournamentIdRepositoryStub
  }
}

describe('DbLoadCategories UseCase', () => {
  test('Should call LoadCategoryByTournamentIdRepository with correct values', async () => {
    const { sut, loadCategoryByTournamentIdRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadCategoryByTournamentIdRepositoryStub, 'loadByTournamentId')

    await sut.load('valid_tournamentId')
    expect(addSpy).toHaveBeenCalledWith('valid_tournamentId')
  })

  test('Should return undefined if LoadCategoryByTournamentIdRepository return empty', async () => {
    const { sut, loadCategoryByTournamentIdRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByTournamentIdRepositoryStub, 'loadByTournamentId').mockReturnValueOnce(new Promise(resolve => { resolve([]) }))
    const categories = await sut.load('valid_tournamentId')

    expect(categories).toBeUndefined()
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, loadCategoryByTournamentIdRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByTournamentIdRepositoryStub, 'loadByTournamentId').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.load('valid_tournamentId')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an category on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.load('valid_tournamentId')
    expect(account).toEqual(makeFakeCategoriesModel())
  })
})

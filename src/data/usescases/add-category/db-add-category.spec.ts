import { TournamentModel } from '../../../domain/models/tournament'
import { LoadTournamentByDescriptionAndIdRepository } from '../protocols/db/tournament/load-tournament-repository'
import { DbAddCategory } from './db-add-category'
import { AddCategory, AddCategoryModel, AddCategoryRepository, CategoryModel } from './db-add-category-protocols'

const makeFakeTournamentModel = (): TournamentModel => ({
  id: 'valid_id',
  description: 'valid_description',
  cityId: 'valid_cityId',
  sportId: 'sportId',
  dtTournament: 'valid_dtTournament',
  registrationLimit: 'valid_registrationLimit',
  registrationStartDate: 'valid_registrationStartDate',
  registrationFinalDate: 'valid_registrationFinalDate'
})

const makeFakeCategoryModel = (): CategoryModel => ({
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  deleted: true
})

const makeFakeAddCategoryModel = (): AddCategoryModel => ({
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})
interface SutTypes {
  sut: AddCategory
  addCategoryRepositoryStub: AddCategoryRepository
  loadTournamentByDescriptionAndIdRepositoryStub: LoadTournamentByDescriptionAndIdRepository
}

const makeAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (category: AddCategoryModel): Promise<CategoryModel | undefined> {
      return makeFakeCategoryModel()
    }
  }
  return new AddCategoryRepositoryStub()
}

const makeLoadTournamentByDescriptionAndIdRepository = (): LoadTournamentByDescriptionAndIdRepository => {
  class LoadTournamentByDescriptionAndIdRepositoryStub implements LoadTournamentByDescriptionAndIdRepository {
    async loadByDescriptionAndId (description: string, id: string): Promise<TournamentModel | undefined> {
      return undefined
    }
  }
  return new LoadTournamentByDescriptionAndIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryStub = makeAddCategoryRepository()
  const loadTournamentByDescriptionAndIdRepositoryStub = makeLoadTournamentByDescriptionAndIdRepository()
  const sut = new DbAddCategory(loadTournamentByDescriptionAndIdRepositoryStub, addCategoryRepositoryStub)
  return {
    sut,
    loadTournamentByDescriptionAndIdRepositoryStub,
    addCategoryRepositoryStub
  }
}

describe('DbAddCategory UseCase', () => {
  test('Should call LoadCategoryByTournamentIdRepository with correct values', async () => {
    const { sut, loadTournamentByDescriptionAndIdRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadTournamentByDescriptionAndIdRepositoryStub, 'loadByDescriptionAndId')

    await sut.add(makeFakeAddCategoryModel())
    expect(addSpy).toHaveBeenCalledWith('valid_description', 'valid_tournamentId')
  })

  test('Should return undefined if LoadCategoryByTournamentIdRepository not return empty', async () => {
    const { sut, loadTournamentByDescriptionAndIdRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByDescriptionAndIdRepositoryStub, 'loadByDescriptionAndId').mockReturnValueOnce(new Promise(resolve => { resolve(makeFakeTournamentModel()) }))
    const accessToken = await sut.add(makeFakeAddCategoryModel())

    expect(accessToken).toBeUndefined()
  })

  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')

    await sut.add(makeFakeAddCategoryModel())
    expect(addSpy).toHaveBeenCalledWith({
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    jest.spyOn(addCategoryRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(makeFakeAddCategoryModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an category on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.add(makeFakeAddCategoryModel())
    expect(account).toEqual(makeFakeCategoryModel())
  })
})

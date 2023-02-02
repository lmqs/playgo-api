import { LoadCategoryByDescriptionAndIdRepository } from '../../protocols/db/category/load-category-by-description-and-id-repository'
import { DbAddCategory } from '@/data/usescases/category/db-add-category'
import { AddCategory } from '@/presentation/controllers/category'
import { AddCategoryRepository } from '@/data/protocols/db/category'
import { mockAddCategoryModel, mockCategoryModel } from '@/../tests/domain/mocks/mock-category'
import { mockAddCategoryRepository } from '@/tests/data/mocks/mock-db-category'

type SutTypes = {
  sut: AddCategory
  addCategoryRepositoryStub: AddCategoryRepository
  loadCategoryByDescriptionAndIdRepositoryStub: LoadCategoryByDescriptionAndIdRepository
}

const makeLoadTournamentByDescriptionAndIdRepository = (): LoadCategoryByDescriptionAndIdRepository => {
  class LoadCategoryByDescriptionAndIdRepositoryStub implements LoadCategoryByDescriptionAndIdRepository {
    async loadByDescriptionAndId (description: string, id: string): Promise<LoadCategoryByDescriptionAndIdRepository.Result | undefined> {
      return undefined
    }
  }
  return new LoadCategoryByDescriptionAndIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryStub = mockAddCategoryRepository()
  const loadCategoryByDescriptionAndIdRepositoryStub = makeLoadTournamentByDescriptionAndIdRepository()
  const sut = new DbAddCategory(loadCategoryByDescriptionAndIdRepositoryStub, addCategoryRepositoryStub)
  return {
    sut,
    loadCategoryByDescriptionAndIdRepositoryStub,
    addCategoryRepositoryStub
  }
}

describe('DbAddCategory UseCase', () => {
  test('Should call LoadCategoryByTournamentIdRepository with correct values', async () => {
    const { sut, loadCategoryByDescriptionAndIdRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadCategoryByDescriptionAndIdRepositoryStub, 'loadByDescriptionAndId')

    await sut.add(mockAddCategoryModel())
    expect(addSpy).toHaveBeenCalledWith('valid_description', 'valid_tournamentId')
  })

  test('Should return undefined if LoadCategoryByDescriptionAndIdRepository not return empty', async () => {
    const { sut, loadCategoryByDescriptionAndIdRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByDescriptionAndIdRepositoryStub, 'loadByDescriptionAndId').mockReturnValueOnce(new Promise(resolve => { resolve([mockCategoryModel(), mockCategoryModel()]) }))
    const accessToken = await sut.add(mockAddCategoryModel())

    expect(accessToken).toBeUndefined()
  })

  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryStub, 'add')

    await sut.add(mockAddCategoryModel())
    expect(addSpy).toHaveBeenCalledWith({
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    jest.spyOn(addCategoryRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(mockAddCategoryModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an category on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.add(mockAddCategoryModel())
    expect(account).toEqual(mockCategoryModel())
  })
})

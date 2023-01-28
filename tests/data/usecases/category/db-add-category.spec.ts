import { LoadCategoryByDescriptionAndIdRepository } from '../../protocols/db/category/load-category-by-description-and-id-repository'
import { AddCategory, AddCategoryRepository, CategoryModel } from '@/data/usescases/category/add-category/db-add-category-protocols'
import { DbAddCategory } from '@/data/usescases/category/add-category/db-add-category'

const makeFakeCategoryModel = (): CategoryModel => ({
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  deleted: true
})

const makeFakeAddCategoryModel = (): AddCategory.Params => ({
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})
type SutTypes = {
  sut: AddCategory
  addCategoryRepositoryStub: AddCategoryRepository
  loadCategoryByDescriptionAndIdRepositoryStub: LoadCategoryByDescriptionAndIdRepository
}

const makeAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (category: AddCategory.Params): Promise<AddCategory.Result | undefined> {
      return makeFakeCategoryModel()
    }
  }
  return new AddCategoryRepositoryStub()
}

const makeLoadTournamentByDescriptionAndIdRepository = (): LoadCategoryByDescriptionAndIdRepository => {
  class LoadCategoryByDescriptionAndIdRepositoryStub implements LoadCategoryByDescriptionAndIdRepository {
    async loadByDescriptionAndId (description: string, id: string): Promise<CategoryModel[] | undefined> {
      return undefined
    }
  }
  return new LoadCategoryByDescriptionAndIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryStub = makeAddCategoryRepository()
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

    await sut.add(makeFakeAddCategoryModel())
    expect(addSpy).toHaveBeenCalledWith('valid_description', 'valid_tournamentId')
  })

  test('Should return undefined if LoadCategoryByDescriptionAndIdRepository not return empty', async () => {
    const { sut, loadCategoryByDescriptionAndIdRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByDescriptionAndIdRepositoryStub, 'loadByDescriptionAndId').mockReturnValueOnce(new Promise(resolve => { resolve([makeFakeCategoryModel(), makeFakeCategoryModel()]) }))
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

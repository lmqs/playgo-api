import { AddCategoryModel } from 'domain/usecases/add-category'
import { CategoryPostgresRepository } from './category-repository'

interface SutTypes {
  sut: CategoryPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new CategoryPostgresRepository()
  return {
    sut
  }
}

const makeFakeAddCategoryModel = (): AddCategoryModel => ({
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})

describe('Category Postgres Repository', () => {
  test('Should return an Category on add success', async () => {
    const { sut } = makeSut()

    const categoryDataMock = { id: 'valid_id', ...makeFakeAddCategoryModel() }
    sut.create = jest.fn().mockReturnValue(categoryDataMock)

    const category = await sut.add(makeFakeAddCategoryModel())

    expect(category).toEqual({
      id: 'valid_id',
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes'
    })
  })
})

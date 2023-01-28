import { CategoryModel } from '@/domain/models/category'
import { AddCategory } from '@/domain/usecases/category/add-category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'

type SutTypes = {
  sut: CategoryPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new CategoryPostgresRepository()
  return {
    sut
  }
}

const makeFakeAddCategoryModel = (): AddCategory.Params => ({
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})

const makeFakeCategoryModel = (): CategoryModel => ({
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})

describe('Category Postgres Repository', () => {
  describe('add()', () => {
    test('Should return an Category on add success', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockReturnValue(makeFakeCategoryModel())

      const category = await sut.add(makeFakeAddCategoryModel())

      expect(category).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        tournamentId: 'valid_tournamentId',
        numberAthletes: 'valid_numberAthletes'
      })
    })

    test('Should return undefined if create fails', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.add(makeFakeAddCategoryModel())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByTournamentId()', () => {
    test('Should return an categories list on loadByTournamentId success', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([makeFakeCategoryModel(), makeFakeCategoryModel()])

      const category = await sut.loadByTournamentId('valid_tournamentId')
      expect(category?.length).toBe(2)
      expect(category).toEqual([
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_numberAthletes'
        },
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_numberAthletes'
        }
      ])
    })

    test('Should return undefined if loadByTournamentId fails', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadByTournamentId('valid_tournamentId')
      await expect(promise).rejects.toThrow()
    })
  })
})

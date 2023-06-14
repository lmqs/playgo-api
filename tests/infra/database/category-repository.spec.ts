import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { categoryDbModelMock, categoryModelMock } from './category-repository-mock'

type SutTypes = {
  sut: CategoryPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new CategoryPostgresRepository()
  return {
    sut
  }
}

describe('Category Postgres Repository', () => {
  describe('add()', () => {
    test('Should return an Category on add success', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockReturnValue(categoryDbModelMock)

      const category = await sut.add(categoryModelMock)

      expect(category).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        tournamentId: 'valid_tournamentId',
        numberAthletes: 'valid_athletes',
        deleted: false
      })
    })

    test('Should rethrow if create fails', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.add(categoryModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByTournamentId()', () => {
    test('Should return an categories list on loadByTournamentId success', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([categoryDbModelMock, categoryDbModelMock])

      const category = await sut.loadByTournamentId('valid_tournamentId')
      expect(sut.findGeneric).toBeCalledWith({ tournament_id: 'valid_tournamentId' })
      expect(category?.length).toBe(2)
      expect(category).toEqual([
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          deleted: false
        },
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          deleted: false
        }
      ])
    })

    test('Should return undefined if loadByDescriptionAndId is empty ', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([])

      const categories = await sut.loadByTournamentId('valid_tournamentId')
      expect(categories?.length).toBe(0)
    })

    test('Should rethrow if loadByTournamentId fails', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadByTournamentId('valid_tournamentId')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByDescriptionAndId()', () => {
    test('Should return an categories list on loadByDescriptionAndId success ', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([categoryDbModelMock, categoryDbModelMock])

      const category = await sut.loadByDescriptionAndId('description', 'valid_tournamentId')
      expect(category?.length).toBe(2)
      expect(category).toEqual([
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          deleted: false
        },
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          deleted: false
        }
      ])
    })

    test('Should return undefined if loadByDescriptionAndId is empty ', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([])

      const categories = await sut.loadByDescriptionAndId('description', 'valid_tournamentId')
      expect(categories?.length).toBe(0)
    })

    test('Should rethrow if loadByDescriptionAndId fails', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadByDescriptionAndId('description', 'valid_tournamentId')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should delete category', async () => {
      const { sut } = makeSut()
      sut.delete = jest.fn().mockReturnValue({})

      await sut.remove('valid_id')
    })

    test('Should rethrow if create fails', async () => {
      const { sut } = makeSut()
      sut.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

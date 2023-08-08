import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { categoryDataModelMock, categoryDbModelMock, categoryModelMock } from './category-repository-mock'

describe('Category Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a category on add success', async () => {
      const repository = new CategoryPostgresRepository()
      repository.create = jest.fn().mockReturnValue(categoryDbModelMock)

      const category = await repository.add(categoryModelMock)

      expect(category).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        tournamentId: 'valid_tournamentId',
        numberAthletes: 'valid_athletes',
        numberAthletesRegistration: 'valid_numberAthletesRegistration',
        deleted: false
      })
    })

    test('Should rethrow if create fails', async () => {
      const repository = new CategoryPostgresRepository()
      repository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.add(categoryModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByTournamentId()', () => {
    test('Should return a categories list on loadByTournamentId success', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([categoryDbModelMock, categoryDbModelMock])

      const category = await repository.loadByTournamentId('valid_tournamentId')
      expect(repository.findGeneric).toBeCalledWith({ tournament_id: 'valid_tournamentId' })
      expect(category?.length).toBe(2)
      expect(category).toEqual([
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          numberAthletesRegistration: 'valid_numberAthletesRegistration',
          deleted: false
        },
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          numberAthletesRegistration: 'valid_numberAthletesRegistration',
          deleted: false
        }
      ])
    })

    test('Should return undefined if loadByDescriptionAndId is empty ', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([])

      const categories = await repository.loadByTournamentId('valid_tournamentId')
      expect(categories?.length).toBe(0)
    })

    test('Should rethrow if loadByTournamentId fails', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadByTournamentId('valid_tournamentId')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByDescriptionAndId()', () => {
    test('Should return a categories list on loadByDescriptionAndId success ', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([categoryDbModelMock, categoryDbModelMock])

      const category = await repository.loadByDescriptionAndId('description', 'valid_tournamentId')
      expect(category?.length).toBe(2)
      expect(category).toEqual([
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          numberAthletesRegistration: 'valid_numberAthletesRegistration',
          deleted: false
        },
        {
          id: 'valid_id',
          description: 'valid_description',
          tournamentId: 'valid_tournamentId',
          numberAthletes: 'valid_athletes',
          numberAthletesRegistration: 'valid_numberAthletesRegistration',
          deleted: false
        }
      ])
    })

    test('Should return undefined if loadByDescriptionAndId is empty ', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([])

      const categories = await repository.loadByDescriptionAndId('description', 'valid_tournamentId')
      expect(categories?.length).toBe(0)
    })

    test('Should rethrow if loadByDescriptionAndId fails', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadByDescriptionAndId('description', 'valid_tournamentId')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should delete category', async () => {
      const repository = new CategoryPostgresRepository()
      repository.delete = jest.fn().mockReturnValue({})

      await repository.remove('valid_id')
    })

    test('Should rethrow if create fails', async () => {
      const repository = new CategoryPostgresRepository()
      repository.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('update()', () => {
    test('Should return a category on update success', async () => {
      const repository = new CategoryPostgresRepository()
      repository.update = jest.fn().mockReturnValue(categoryDbModelMock)

      const category = await repository.updateData(categoryDataModelMock)

      expect(category).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        tournamentId: 'valid_tournamentId',
        numberAthletes: 'valid_athletes',
        numberAthletesRegistration: 'valid_numberAthletesRegistration',
        deleted: false
      })
    })

    test('Should rethrow if create fails', async () => {
      const repository = new CategoryPostgresRepository()
      repository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.add(categoryModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a category on loadById success', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([categoryDbModelMock])

      const category = await repository.loadById('1')
      expect(repository.findGeneric).toBeCalledWith({ id: '1' })
      expect(category).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        tournamentId: 'valid_tournamentId',
        numberAthletes: 'valid_athletes',
        numberAthletesRegistration: 'valid_numberAthletesRegistration',
        deleted: false
      })
    })

    test('Should return undefined if loadById is empty ', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([])

      const category = await repository.loadById('1')
      expect(category).toBeUndefined()
    })

    test('Should rethrow if loadById fails', async () => {
      const repository = new CategoryPostgresRepository()
      repository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadById('1')
      await expect(promise).rejects.toThrow()
    })
  })
})

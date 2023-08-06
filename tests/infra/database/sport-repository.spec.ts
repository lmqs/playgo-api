import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { sportAddParamsMock, sportMock, sportsMock } from './sport-repository-mock'

describe('Sport Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a sport on add success', async () => {
      const repository = new SportPostgresRepository()
      repository.create = jest.fn().mockReturnValue(sportMock)
      const sport = await repository.add(sportAddParamsMock)

      expect(sport).toEqual(sportMock)
    })

    test('Should return undefined if add fails', async () => {
      const repository = new SportPostgresRepository()
      repository.create = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const promise = repository.add(sportAddParamsMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByDescription()', () => {
    test('Should return a sport on add success', async () => {
      const repository = new SportPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue(sportsMock)

      const sport = await repository.loadByDescription('tennis')
      expect(sport).toEqual(sportsMock)
    })

    test('Should return undefined if loadByDescription fails', async () => {
      const repository = new SportPostgresRepository()
      repository.findGeneric = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const promise = repository.loadByDescription('tennis')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a sport on loadById success', async () => {
      const repository = new SportPostgresRepository()
      repository.findOne = jest.fn().mockReturnValue(sportMock)

      const sport = await repository.loadById('2')
      expect(sport).toEqual(sportMock)
    })

    test('Should return undefined if loadById fails', async () => {
      const repository = new SportPostgresRepository()
      repository.findOne = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const promise = repository.loadById('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadAll()', () => {
    test('Should return a sport on loadAll success', async () => {
      const repository = new SportPostgresRepository()
      repository.findAll = jest.fn().mockReturnValue(sportsMock)

      const sport = await repository.loadAll()
      expect(sport).toEqual(sportsMock)
    })

    test('Should return undefined if loadAll fails', async () => {
      const repository = new SportPostgresRepository()
      repository.findAll = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadAll()
      await expect(promise).rejects.toThrow()
    })
  })
})

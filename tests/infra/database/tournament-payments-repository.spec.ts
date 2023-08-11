import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { addParamsMock, outputDbMock, outputMock } from './tournament-payments-repository-mock'

describe('Tournament-Payments Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a tournament-payments on add success', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.create = jest.fn().mockReturnValue(outputDbMock)
      const result = await repository.add(addParamsMock)
      expect(result).toEqual(outputMock)
    })

    test('Should return throws if create fails', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.add(addParamsMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a tournament-payments on loadById', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.findOne = jest.fn().mockReturnValue(outputDbMock)

      const tournament = await repository.loadById('1')
      expect(tournament).toEqual(outputMock)
    })

    test('Should return throws if loadById fails', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadById('1')
      await expect(promise).rejects.toThrow()
    })

    test('Should return undefined if loadById empty', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.findOne = jest.fn().mockReturnValue(undefined)

      const tournament = await repository.loadById('1')
      expect(tournament).toBeUndefined()
    })
  })

  describe('loadAll()', () => {
    test('Should return a tournament-payments list on loadAll', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.findAll = jest.fn().mockReturnValue([outputDbMock])

      const tournaments = await repository.load()
      expect(tournaments).toEqual([outputMock])
    })

    test('Should return throws if findAll fails', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.findAll = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.load()
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should remove tournament-payment success', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.delete = jest.fn().mockReturnValue(undefined)
      const result = await repository.remove('1')
      expect(result).toBeTruthy()
    })

    test('Should return throws if remove fails', async () => {
      const repository = new TournamentPaymentsPostgresRepository()
      repository.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.remove('1')
      await expect(promise).rejects.toThrow()
    })
  })
})

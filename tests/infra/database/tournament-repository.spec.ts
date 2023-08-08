import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { outputDbMock, addInputMock, addOutputMock, loadByIdOutputMock, updateInputMock, updateOutputMock, outputDbArrayMock, listAllOutputMock, updateInputIncompleteMock, updateInputDbIncompleteMock } from './tournament-repository-mock'
jest.useFakeTimers().setSystemTime(new Date('2023-05-25 00:00:00'))

describe('Tournament Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a tournament on add success', async () => {
      const repository = new TournamentPostgresRepository()
      repository.create = jest.fn().mockReturnValue(outputDbMock)
      const tournament = await repository.add(addInputMock)
      expect(tournament).toEqual(addOutputMock)
    })

    test('Should return throws if create fails', async () => {
      const repository = new TournamentPostgresRepository()
      repository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.add(addInputMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return an tournament on loadByTournamentId', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([outputDbMock])

      const tournament = await repository.loadById('valid_tournamentId')
      expect(tournament).toEqual(loadByIdOutputMock)
    })

    test('Should return throws if loadByTournamentId fails', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadById('valid_id')
      await expect(promise).rejects.toThrow()
    })

    test('Should return undefined if loadByTournamentId empty', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([])

      const tournament = await repository.loadById('valid_id')
      expect(tournament).toBeUndefined()
    })
  })

  describe('update()', () => {
    test('Should return an tournament on update success', async () => {
      const repository = new TournamentPostgresRepository()
      repository.update = jest.fn().mockReturnValue(outputDbMock)
      const tournament = await repository.updateTournament(updateInputMock)

      expect(tournament).toEqual(updateOutputMock)
    })

    test('Should not date update when dt start and dt final is not provider', async () => {
      const repository = new TournamentPostgresRepository()
      repository.update = jest.fn().mockReturnValue(outputDbMock)
      const tournament = await repository.updateTournament(updateInputIncompleteMock)

      expect(tournament).toEqual(updateOutputMock)
      expect(repository.update).toHaveBeenCalledWith(updateInputDbIncompleteMock,
        { id: updateInputIncompleteMock.id }
      )
    })

    test('Should return throws if create fails', async () => {
      const repository = new TournamentPostgresRepository()
      repository.update = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.updateTournament(updateInputMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadAll()', () => {
    test('Should return a tournament list on loadAll', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findAll = jest.fn().mockReturnValue(outputDbArrayMock)

      const tournaments = await repository.loadAll()
      expect(tournaments).toEqual(listAllOutputMock)
    })

    test('Should return throws if loadTournamentsRepository fails', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findAll = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadAll()
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByDescription()', () => {
    test('Should return a tournament list by description filter', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue(outputDbArrayMock)

      const tournaments = await repository.loadByDescription('any_tournament')
      expect(tournaments).toEqual(listAllOutputMock)
    })

    test('Should return undefined when tournament filter is empty', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findGeneric = jest.fn().mockReturnValue([])

      const tournaments = await repository.loadByDescription('any_tournament')
      expect(tournaments.length).toBe(0)
    })

    test('Should return throws if repository.loadByDescription fails', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadByDescription('any_tournament')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should remove tournament success', async () => {
      const repository = new TournamentPostgresRepository()
      repository.update = jest.fn().mockReturnValue(outputDbMock)
      await repository.remove('valid_id')
    })

    test('Should return throws if remove fails', async () => {
      const repository = new TournamentPostgresRepository()
      repository.update = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadFilter()', () => {
    test('Should return a tournament list by description filter', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findWhereGeneric = jest.fn().mockReturnValue(outputDbArrayMock)

      const tournaments = await repository.loadFilter({ date: '08/08/2023', operator: '<=' })
      expect(tournaments).toEqual(listAllOutputMock)
    })

    test('Should return [] when tournament filter is empty', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findWhereGeneric = jest.fn().mockReturnValue([])

      const tournaments = await repository.loadFilter({ date: '08/08/2023', operator: '<=' })
      expect(tournaments.length).toBe(0)
    })

    test('Should return throws if repository.loadFilter fails', async () => {
      const repository = new TournamentPostgresRepository()
      repository.findWhereGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repository.loadFilter({ date: '08/08/2023', operator: '<=' })
      await expect(promise).rejects.toThrow()
    })
  })
})

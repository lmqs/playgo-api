import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { addTournamentSponsorModelMock, dbAddTournamentSponsorModelMock, dbTournamentSponsorModelMock, dbUpdateTournamentSponsorModelMock, updateTournamentSponsorModelMock } from './tournament-sponsor-repository-mock'

describe('Tournament-Sponsor Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a tournament-sponsor model on add success', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.create = jest.fn().mockReturnValue(dbAddTournamentSponsorModelMock)

      const result = await tournamentSponsorRepository.add(addTournamentSponsorModelMock)
      expect(result).toStrictEqual({
        id: '1',
        name: 'valid_name',
        photo: undefined,
        tournamentId: 'valid_tournament',
        otherInformation: undefined,
        deleted: true
      })
    })

    test('Should rethrow if create fails', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = tournamentSponsorRepository.add(addTournamentSponsorModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByTournamentId()', () => {
    test('Should return a tournament-sponsor array on load with success', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.findGeneric = jest.fn().mockReturnValue([dbAddTournamentSponsorModelMock])

      const result = await tournamentSponsorRepository.loadByTournamentId('tournament_id')
      expect(result).toStrictEqual([{
        id: '1',
        name: 'valid_name',
        photo: undefined,
        tournamentId: 'valid_tournament',
        otherInformation: undefined,
        deleted: true
      }])
    })

    test('Should return a tournament-sponsor array empty if  is not register in database', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.findGeneric = jest.fn().mockReturnValue([])

      const result = await tournamentSponsorRepository.loadByTournamentId('tournament_id')
      expect(result).toStrictEqual([])
      expect(result.length).toBe(0)
    })

    test('Should rethrow if loadByTournamentId fails', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = tournamentSponsorRepository.loadByTournamentId('tournament_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a tournament-sponsor model on load with success', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.findGeneric = jest.fn().mockReturnValue([dbAddTournamentSponsorModelMock])

      const result = await tournamentSponsorRepository.loadById('d')
      expect(result).toStrictEqual({
        id: '1',
        name: 'valid_name',
        photo: undefined,
        tournamentId: 'valid_tournament',
        otherInformation: undefined,
        deleted: true
      })
    })

    test('Should return undefined if is not exists in database', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.findGeneric = jest.fn().mockReturnValue([])

      const result = await tournamentSponsorRepository.loadById('id')
      expect(result).toBeUndefined()
    })

    test('Should rethrow if loadById fails', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = tournamentSponsorRepository.loadById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should delete tournament-sponsor', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.delete = jest.fn().mockReturnValue({})

      await tournamentSponsorRepository.remove('valid_id')
      expect(tournamentSponsorRepository.delete).toHaveBeenCalledWith('valid_id')
    })

    test('Should rethrow if create fails', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = tournamentSponsorRepository.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('updateSponsor()', () => {
    test('Should return a tournament-sponsor model on add success', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.update = jest.fn().mockReturnValue(dbUpdateTournamentSponsorModelMock)

      const result = await tournamentSponsorRepository.updateSponsor(updateTournamentSponsorModelMock)
      expect(result).toEqual(dbTournamentSponsorModelMock)
    })

    test('Should rethrow if update fails', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.update = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = tournamentSponsorRepository.updateSponsor(updateTournamentSponsorModelMock)
      await expect(promise).rejects.toThrow()
    })
  })
})

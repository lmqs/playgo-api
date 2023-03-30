import { mockAddTournamentParams, mockTournamentModel, mockTournamentsModel } from '@/tests/domain/mocks'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { mockLoadCityByIdRepository } from '../../data/mocks/mock-db-city'

type SutTypes = {
  sut: TournamentPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new TournamentPostgresRepository(mockLoadCityByIdRepository())
  return {
    sut
  }
}

describe('Tournament Postgres Repository', () => {
  describe('add()', () => {
    test('Should return an Tournament on add success', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockReturnValue(mockTournamentModel())

      const tournament = await sut.add(mockAddTournamentParams())

      expect(tournament).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        cityId: 'valid_city',
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationStartDate: 'valid_registrationStartDate',
        registrationFinalDate: 'valid_registrationFinalDate',
        deleted: true
      })
    })

    test('Should return throws if create fails', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.add(mockAddTournamentParams())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return an tournament on loadByTournamentId', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([mockTournamentModel()])

      const tournament = await sut.loadById('valid_tournamentId')
      expect(tournament).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        cityId: 'valid_city',
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationStartDate: 'valid_registrationStartDate',
        registrationFinalDate: 'valid_registrationFinalDate',
        deleted: true
      })
    })

    test('Should return throws if loadByTournamentId fails', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadById('valid_id')
      await expect(promise).rejects.toThrow()
    })

    test('Should return undefined if loadByTournamentId empty', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([])

      const tournament = await sut.loadById('valid_id')
      expect(tournament).toBeUndefined()
    })
  })

  describe('update()', () => {
    test('Should return an Tournament on update success', async () => {
      const { sut } = makeSut()
      sut.update = jest.fn().mockReturnValue(mockTournamentModel())

      const tournament = await sut.updateTournament(mockTournamentModel())

      expect(tournament).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        cityId: 'valid_city',
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationStartDate: 'valid_registrationStartDate',
        registrationFinalDate: 'valid_registrationFinalDate',
        deleted: true
      })
    })

    test('Should return throws if create fails', async () => {
      const { sut } = makeSut()
      sut.update = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.updateTournament(mockTournamentModel())
      await expect(promise).rejects.toThrow()
    })
  })
  describe('loadAll()', () => {
    test('Should return a tournament list on loadAll', async () => {
      const { sut } = makeSut()
      sut.findAll = jest.fn().mockReturnValue(mockTournamentsModel())

      const tournaments = await sut.loadAll()
      expect(tournaments).toEqual([{
        id: 'valid_id',
        description: 'valid_description',
        cityId: {
          area: 'any',
          codeIbge: 'any_code',
          deleted: true,
          gentilic: 'any_gentilic',
          id: 'any_id',
          name: 'any_name',
          stateId: 'any_stateId'
        },
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationStartDate: 'valid_registrationStartDate',
        registrationFinalDate: 'valid_registrationFinalDate',
        deleted: true
      },
      {
        id: 'valid__other_id',
        description: 'valid_description',
        cityId: {
          area: 'any',
          codeIbge: 'any_code',
          deleted: true,
          gentilic: 'any_gentilic',
          id: 'any_id',
          name: 'any_name',
          stateId: 'any_stateId'
        },
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationStartDate: 'valid_registrationStartDate',
        registrationFinalDate: 'valid_registrationFinalDate',
        deleted: true
      }])
    })

    test('Should return throws if loadTournamentsRepository fails', async () => {
      const { sut } = makeSut()
      sut.findAll = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadAll()
      await expect(promise).rejects.toThrow()
    })
  })
})

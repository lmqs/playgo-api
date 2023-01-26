import { SaveTournamentModel } from '../../../../domain/usecases/tournament/save-tournament'
import { TournamentModel } from '../../../../domain/models/tournament'

import { TournamentPostgresRepository } from './tournament-repository'

type SutTypes = {
  sut: TournamentPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new TournamentPostgresRepository()
  return {
    sut
  }
}

const makeFakeTournamentModel = (): TournamentModel => {
  return {
    id: 'valid_id',
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationLimit: 'valid_registrationLimit',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  }
}

const makeFakeSaveTournamentModelToAdd = (): SaveTournamentModel => {
  return {
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationLimit: 'valid_registrationLimit',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  }
}

const makeFakeSaveTournamentModelToUpdate = (): SaveTournamentModel => Object.assign(
  {}, makeFakeSaveTournamentModelToAdd(), { id: 'valid_id' }
)
describe('Tournament Postgres Repository', () => {
  describe('add()', () => {
    test('Should return an Tournament on add success', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockReturnValue(makeFakeTournamentModel())

      const tournament = await sut.add(makeFakeSaveTournamentModelToAdd())

      expect(tournament).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        cityId: 'valid_city',
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationLimit: 'valid_registrationLimit',
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
      const promise = sut.add(makeFakeSaveTournamentModelToAdd())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return an tournament on loadByTournamentId', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([makeFakeTournamentModel()])

      const tournament = await sut.loadById('valid_tournamentId')
      expect(tournament).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        cityId: 'valid_city',
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationLimit: 'valid_registrationLimit',
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
      sut.update = jest.fn().mockReturnValue(makeFakeSaveTournamentModelToUpdate())

      const tournament = await sut.updateTournament(makeFakeTournamentModel())

      expect(tournament).toEqual({
        id: 'valid_id',
        description: 'valid_description',
        cityId: 'valid_city',
        sportId: 'valid_sportId',
        dtTournament: 'valid_dtTournament',
        registrationLimit: 'valid_registrationLimit',
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
      const promise = sut.updateTournament(makeFakeTournamentModel())
      await expect(promise).rejects.toThrow()
    })
  })
})

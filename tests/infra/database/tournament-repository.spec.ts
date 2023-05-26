import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { outputDbMock, addInputMock, addOutputMock, loadByIdOutputMock, updateInputMock, updateOutputMock, outputDbArrayMock, listAllOutputMock } from './tournament-repository-mock'
jest.useFakeTimers().setSystemTime(new Date('2023-05-25 00:00:00'))

type SutTypes = {
  sut: TournamentPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new TournamentPostgresRepository()
  return {
    sut
  }
}

describe('Tournament Postgres Repository', () => {
  describe('add()', () => {
    test('Should return an Tournament on add success', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockReturnValue(outputDbMock)
      const tournament = await sut.add(addInputMock)
      expect(tournament).toEqual(addOutputMock)
    })

    test('Should return throws if create fails', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.add(addInputMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return an tournament on loadByTournamentId', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([outputDbMock])

      const tournament = await sut.loadById('valid_tournamentId')
      expect(tournament).toEqual(loadByIdOutputMock)
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
      sut.update = jest.fn().mockReturnValue(outputDbMock)
      const tournament = await sut.updateTournament(updateInputMock)

      expect(tournament).toEqual(updateOutputMock)
    })

    test('Should return throws if create fails', async () => {
      const { sut } = makeSut()
      sut.update = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.updateTournament(updateInputMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadAll()', () => {
    test('Should return a tournament list on loadAll', async () => {
      const { sut } = makeSut()
      sut.findAll = jest.fn().mockReturnValue(outputDbArrayMock)

      const tournaments = await sut.loadAll()
      expect(tournaments).toEqual(listAllOutputMock)
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

  describe('remove()', () => {
    test('Should remove tournament success', async () => {
      const { sut } = makeSut()
      sut.update = jest.fn().mockReturnValue(outputDbMock)
      await sut.remove('valid_id')
    })

    test('Should return throws if remove fails', async () => {
      const { sut } = makeSut()
      sut.update = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

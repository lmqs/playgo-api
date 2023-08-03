import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { DbLoadFilterTournaments } from '@/data/usescases/tournament/load-filter-tournament'
import { DateHandler, IFormatDate } from '@/helpers/date-handler'
import { loadFilterFinishedMock, loadFilterOpenedMock } from './load-tournament-by-filter-date-mock'

describe('DbLoadFilterTournaments UseCase', () => {
  let tournamentRepositoryStub: ITournamentRepository
  let dateHandlerStub: IFormatDate
  beforeEach(() => {
    tournamentRepositoryStub = new TournamentPostgresRepository()
    dateHandlerStub = new DateHandler()
  })

  test('Should return array empty of opened and finished objects when both tournamentRepository.loadFilter return empty', async () => {
    jest.spyOn(dateHandlerStub, 'formatDateToString').mockReturnValueOnce('2023-08-03')
    jest.spyOn(tournamentRepositoryStub, 'loadFilter').mockResolvedValueOnce([])
    jest.spyOn(tournamentRepositoryStub, 'loadFilter').mockResolvedValueOnce([])

    const useCase = new DbLoadFilterTournaments(tournamentRepositoryStub, dateHandlerStub)
    const result = await useCase.loadDateFilter()

    expect(result?.opened.length).toBe(0)
    expect(result?.finished.length).toBe(0)
  })

  test('Should throw if loadTournamentByIdRepository throws', async () => {
    const useCase = new DbLoadFilterTournaments(tournamentRepositoryStub, dateHandlerStub)
    jest.spyOn(tournamentRepositoryStub, 'loadFilter').mockImplementation(() => {
      throw new Error()
    })

    const promise = useCase.loadDateFilter()
    await expect(promise).rejects.toThrow()
  })

  test('Should return an tournaments opened and finished on success', async () => {
    jest.spyOn(dateHandlerStub, 'formatDateToString').mockReturnValueOnce('2023-08-03')
    const finishedSpy = jest.spyOn(tournamentRepositoryStub, 'loadFilter')
    finishedSpy.mockResolvedValueOnce(loadFilterFinishedMock)
    const openedSpy = jest.spyOn(tournamentRepositoryStub, 'loadFilter')
    openedSpy.mockResolvedValueOnce(loadFilterOpenedMock)

    const useCase = new DbLoadFilterTournaments(tournamentRepositoryStub, dateHandlerStub)

    const result = await useCase.loadDateFilter()
    expect(result).toEqual({ opened: loadFilterOpenedMock, finished: loadFilterFinishedMock })
    expect(tournamentRepositoryStub.loadFilter).toHaveBeenCalledTimes(2)
  })
})

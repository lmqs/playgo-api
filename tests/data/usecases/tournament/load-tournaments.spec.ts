import { DbLoadTournaments } from '@/data/usescases/tournament/load-tournaments'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { cityModelMock, loadTournamentsModelMock, loadTournamentsRepositoryMock, sportModelMock } from './load-tournament-mock'
import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { ISportRepository } from '@/data/protocols/db'

describe('DbLoadTournaments UseCase', () => {
  let tournamentsRepositoryStub: ITournamentRepository
  let loadCityByIdRepositoryStub: LoadCityByIdRepository
  let loadSportByIdRepositoryStub: ISportRepository

  beforeEach(() => {
    loadCityByIdRepositoryStub = new CityPostgresRepository()
    loadSportByIdRepositoryStub = new SportPostgresRepository()
    tournamentsRepositoryStub = new TournamentPostgresRepository()
  })
  test('Should return undefined if loadAll return empty', async () => {
    jest.spyOn(tournamentsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve(undefined))
    const useCase = new DbLoadTournaments(tournamentsRepositoryStub, loadCityByIdRepositoryStub, loadSportByIdRepositoryStub)

    const tournaments = await useCase.load()

    expect(tournaments).toBeUndefined()
  })

  test('Should throw if loadTournamentsRepository throws', async () => {
    const useCase = new DbLoadTournaments(tournamentsRepositoryStub, loadCityByIdRepositoryStub, loadSportByIdRepositoryStub)
    jest.spyOn(tournamentsRepositoryStub, 'loadAll').mockImplementation(() => { throw new Error() })

    const promise = useCase.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a tournament list on success', async () => {
    jest.spyOn(tournamentsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve(loadTournamentsRepositoryMock))
    jest.spyOn(loadCityByIdRepositoryStub, 'loadById').mockResolvedValueOnce(cityModelMock)
    jest.spyOn(loadCityByIdRepositoryStub, 'loadById').mockResolvedValueOnce(cityModelMock)
    jest.spyOn(loadSportByIdRepositoryStub, 'loadById').mockResolvedValueOnce(sportModelMock)
    jest.spyOn(loadSportByIdRepositoryStub, 'loadById').mockResolvedValueOnce(sportModelMock)

    const useCase = new DbLoadTournaments(tournamentsRepositoryStub, loadCityByIdRepositoryStub, loadSportByIdRepositoryStub)

    const tournaments = await useCase.load()
    expect(tournaments).toEqual(loadTournamentsModelMock)
    expect(tournamentsRepositoryStub.loadAll).toHaveBeenCalledTimes(1)
    expect(loadCityByIdRepositoryStub.loadById).toHaveBeenCalledTimes(2)
    expect(loadSportByIdRepositoryStub.loadById).toHaveBeenCalledTimes(2)
  })
})

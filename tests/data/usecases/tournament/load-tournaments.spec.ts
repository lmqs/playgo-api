import { mockLoadTournamentsModel } from '@/tests/domain/mocks'
import { LoadTournamentsRepository } from '@/data/protocols/db/tournament'
import { DbLoadTournaments } from '@/data/usescases/tournament/load-tournaments'
import { mockLoadTournamentsRepository } from '@/tests/data/mocks'
import { mockLoadCityByIdRepository } from '../../mocks/mock-db-city'
import { mockLoadSportByIdRepository } from '../../mocks/mock-db-sport'
import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { LoadSportByIdRepository } from '@/data/usescases/sport'

type SutTypes = {
  sut: DbLoadTournaments
  loadTournamentsRepositoryStub: LoadTournamentsRepository
  loadCityByIdRepositoryStub: LoadCityByIdRepository
  loadSportByIdRepositoryStub: LoadSportByIdRepository
}

const makeSut = (): SutTypes => {
  const loadTournamentsRepositoryStub = mockLoadTournamentsRepository()
  const loadCityByIdRepositoryStub = mockLoadCityByIdRepository()
  const loadSportByIdRepositoryStub = mockLoadSportByIdRepository()
  const sut = new DbLoadTournaments(loadTournamentsRepositoryStub, loadCityByIdRepositoryStub, loadSportByIdRepositoryStub)
  return {
    sut,
    loadTournamentsRepositoryStub,
    loadCityByIdRepositoryStub,
    loadSportByIdRepositoryStub
  }
}

describe('DbLoadTournaments UseCase', () => {
  test('Should return undefined if LoadTournamentByIdRepository return empty', async () => {
    const { sut, loadTournamentsRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve(undefined))
    const tournaments = await sut.load()

    expect(tournaments).toBeUndefined()
  })

  test('Should throw if loadTournamentsRepository throws', async () => {
    const { sut, loadTournamentsRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentsRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a tournament list on success', async () => {
    const { sut } = makeSut()

    const tournaments = await sut.load()
    expect(tournaments).toEqual(mockLoadTournamentsModel())
  })
})

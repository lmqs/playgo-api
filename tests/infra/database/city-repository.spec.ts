import { mockCitiesModel, mockCityModel } from '@/tests/domain/mocks/mock-city'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'

type SutTypes = {
  sut: SportPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new SportPostgresRepository()
  return {
    sut
  }
}

describe('City Postgres Repository', () => {
  describe('loadById()', () => {
    test('Should return a city on loadById success', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([mockCityModel()])

      const city = await sut.loadById('any_id')
      expect(city).toEqual({
        id: 'any_id',
        name: 'any_name',
        codeIbge: 'any_code',
        stateId: 'any_stateId',
        gentilic: 'any_gentilic',
        deleted: true,
        area: 'any'
      })
    })

    test('Should return undefined if loadById fails', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadById('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadAll()', () => {
    test('Should return a city on loadAll success', async () => {
      const { sut } = makeSut()
      sut.findAll = jest.fn().mockReturnValue(mockCitiesModel())

      const city = await sut.loadAll()
      expect(city).toEqual([{
        id: 'any_id',
        name: 'any_name',
        codeIbge: 'any_code',
        stateId: 'any_stateId',
        gentilic: 'any_gentilic',
        deleted: true,
        area: 'any'
      },
      {
        id: 'any_other_id',
        name: 'any_name',
        codeIbge: 'any_code',
        stateId: 'any_stateId',
        gentilic: 'any_gentilic',
        deleted: true,
        area: 'any'
      }])
    })

    test('Should return undefined if loadAll fails', async () => {
      const { sut } = makeSut()
      sut.findAll = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadAll()
      await expect(promise).rejects.toThrow()
    })
  })
})

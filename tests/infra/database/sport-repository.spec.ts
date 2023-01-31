import { mockAddSportParams, mockSportAllModel, mockSportModel } from '@/tests/domain/mocks/mock-sport'
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

describe('Sport Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a sport on add success', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockReturnValue(mockSportModel())
      const sport = await sut.add(mockAddSportParams())

      expect(sport).toEqual({
        id: '1',
        description: 'any_description',
        deleted: false
      })
    })

    test('Should return undefined if add fails', async () => {
      const { sut } = makeSut()
      sut.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.add(mockAddSportParams())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByDescription()', () => {
    test('Should return a sport on add success', async () => {
      const { sut } = makeSut()
      sut.findOne = jest.fn().mockReturnValue(mockSportModel())

      const sport = await sut.loadByDescription('any_description')
      expect(sport).toEqual({
        id: '1',
        description: 'any_description',
        deleted: false
      })
    })

    test('Should return undefined if loadByDescription fails', async () => {
      const { sut } = makeSut()
      sut.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadByDescription('any_description')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a sport on loadById success', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([mockSportModel()])

      const sport = await sut.loadById('any_id')
      expect(sport).toEqual({
        id: '1',
        description: 'any_description',
        deleted: false
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
    test('Should return a sport on loadAll success', async () => {
      const { sut } = makeSut()
      sut.findAll = jest.fn().mockReturnValue(mockSportAllModel())

      const sport = await sut.loadAll()
      expect(sport).toEqual([{
        id: 'any_id',
        description: 'any_description',
        deleted: false
      },
      {
        id: 'other_id',
        description: 'any_description',
        deleted: false
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

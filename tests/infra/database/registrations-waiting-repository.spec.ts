import { RegistrationsWaitingPostgresRepository } from '@/infra/database/postgres/registrations/registrations-waiting-repository'
import { registrationWaitingDbMock, registrationWaitingModelMock } from './registrations-waiting-repository-mock'

describe('RegistrationsWaitingPostgresRepository', () => {
  describe('add()', () => {
    test('Should return a register-waiting model on add success', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.create = jest.fn().mockReturnValue(registrationWaitingDbMock)

      const result = await repo.add(registrationWaitingModelMock)
      expect(result).toEqual(registrationWaitingModelMock)
    })

    test('Should rethrow if create fails', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.create = jest.fn().mockImplementation(() => {
        throw new Error()
      })
      const promise = repo.add(registrationWaitingModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a register-category model on load with success', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([registrationWaitingDbMock])

      const result = await repo.loadById('1')
      expect(result).toEqual(registrationWaitingModelMock)
      expect(repo.findGeneric).toHaveBeenCalledWith({ id: '1', deleted: false })
    })

    test('Should return undefined if is not exists in database', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([])

      const result = await repo.loadById('1')
      expect(result).toBeUndefined()
      expect(repo.findGeneric).toHaveBeenCalledWith({ id: '1', deleted: false })
    })

    test('Should rethrow if loadById fails', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repo.loadById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByCategory()', () => {
    test('Should return a register-category model on loadByCategory with success', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([registrationWaitingDbMock])

      const result = await repo.loadByCategory('1')
      expect(result).toEqual([registrationWaitingModelMock])
      expect(repo.findGeneric).toHaveBeenCalledWith({ category_id: '1', deleted: false })
    })

    test('Should return undefined if is not exists in database', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([])

      const result = await repo.loadByCategory('1')
      expect(result.length).toBe(0)
      expect(repo.findGeneric).toHaveBeenCalledWith({ category_id: '1', deleted: false })
    })

    test('Should rethrow if loadByCategory fails', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repo.loadByCategory('1')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should deleteByField register-category', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.delete = jest.fn().mockReturnValue({})

      await repo.remove('valid_id')
      expect(repo.delete).toHaveBeenCalledWith('valid_id')
    })

    test('Should rethrow if create fails', async () => {
      const repo = new RegistrationsWaitingPostgresRepository()
      repo.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repo.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

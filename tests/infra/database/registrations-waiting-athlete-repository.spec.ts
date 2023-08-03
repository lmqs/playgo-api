import { RegistrationsAthleteWaitingPostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-waiting-repository'
import { registrationAthleteWaitingAddParamsMock, registrationAthleteWaitingDbMock, registrationAthleteWaitingMock } from './registrations-waiting-athlete-repository-mock'

describe('Register waiting athlete Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a registrations-athlete model on add success', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.create = jest.fn().mockReturnValue(registrationAthleteWaitingDbMock)

      const result = await repo.add(registrationAthleteWaitingAddParamsMock)
      expect(result).toEqual(registrationAthleteWaitingMock)
    })

    test('Should rethrow if create fails', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repo.add(registrationAthleteWaitingAddParamsMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a registrations-athlete-waiting model on load with success', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([registrationAthleteWaitingDbMock])

      const result = await repo.loadById('1')
      expect(result).toEqual(registrationAthleteWaitingMock)
      expect(repo.findGeneric).toHaveBeenCalledWith({ id: '1', deleted: false })
    })

    test('Should return undefined if is not exists in database', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([])

      const result = await repo.loadById('id')
      expect(result).toBeUndefined()
    })

    test('Should rethrow if loadById fails', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repo.loadById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByRegistrationsWaiting()', () => {
    test('Should return a registrations-athlete-waiting model on load by registrations waiting table with success', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([registrationAthleteWaitingDbMock])

      const result = await repo.loadByRegistrationsWaiting('1')
      expect(result).toEqual([registrationAthleteWaitingMock])
      expect(repo.findGeneric).toHaveBeenCalledWith({ registrations_waiting_id: '1', deleted: false })
    })

    test('Should return an array empty if is not exists in database', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockReturnValue([])

      const result = await repo.loadByRegistrationsWaiting('id')
      expect(result?.length).toBe(0)
    })

    test('Should rethrow if loadByRegistrationsWaiting fails', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repo.loadByRegistrationsWaiting('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should delete registrations-athlete-waiting', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.delete = jest.fn().mockReturnValue({})

      await repo.remove('valid_id')
      expect(repo.delete).toHaveBeenCalledWith('valid_id')
    })

    test('Should rethrow if delete fails', async () => {
      const repo = new RegistrationsAthleteWaitingPostgresRepository()
      repo.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = repo.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

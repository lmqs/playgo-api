import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import { addRegistrationAthleteModelMock, dbLoadByCategoryAndUserModelMock, dbRegistrationAthleteModelMock } from './registrations-athlete-repository-mock'

describe('Register-category-athlete Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a registrations-athlete model on add success', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.create = jest.fn().mockReturnValue(dbRegistrationAthleteModelMock)

      const result = await registrationAthleteRepo.add(addRegistrationAthleteModelMock)
      expect(result).toStrictEqual({
        id: '1',
        registrationsId: 'any_register_category',
        athleteId: 'any_athlete',
        isPay: false,
        deleted: false
      })
    })

    test('Should rethrow if create fails', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationAthleteRepo.add(addRegistrationAthleteModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a registrations-athlete-athlete model on load with success', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findGeneric = jest.fn().mockReturnValue([dbRegistrationAthleteModelMock])

      const result = await registrationAthleteRepo.loadById('1')
      expect(result).toStrictEqual({
        id: '1',
        registrationsId: 'any_register_category',
        athleteId: 'any_athlete',
        isPay: false,
        deleted: false
      })
    })

    test('Should return undefined if is not exists in database', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registrationAthleteRepo.loadById('id')
      expect(result).toBeUndefined()
    })

    test('Should rethrow if loadById fails', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationAthleteRepo.loadById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByCategory()', () => {
    test('Should return a registrations-athlete model on load with success', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findWithJoin = jest.fn().mockReturnValue([dbRegistrationAthleteModelMock])

      const result = await registrationAthleteRepo.loadByCategory('1')
      expect(result).toStrictEqual([{
        id: '1',
        registrationsId: 'any_register_category',
        athleteId: 'any_athlete',
        isPay: false,
        deleted: false
      }])
    })

    test('Should return an array empty if is not exists in database', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findWithJoin = jest.fn().mockReturnValue([])

      const result = await registrationAthleteRepo.loadByCategory('id')
      expect(result?.length).toBe(0)
    })

    test('Should rethrow if loadByCategory fails', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findWithJoin = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationAthleteRepo.loadByCategory('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByRegistrations()', () => {
    test('Should return a registrations-athlete model on load by registrations table with success', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findGeneric = jest.fn().mockReturnValue([dbRegistrationAthleteModelMock])

      const result = await registrationAthleteRepo.loadByRegistrations('1')
      expect(result).toStrictEqual([{
        id: '1',
        registrationsId: 'any_register_category',
        athleteId: 'any_athlete',
        isPay: false,
        deleted: false
      }])
    })

    test('Should return an array empty if is not exists in database', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registrationAthleteRepo.loadByRegistrations('id')
      expect(result?.length).toBe(0)
    })

    test('Should rethrow if loadByRegistrations fails', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationAthleteRepo.loadByRegistrations('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByCategoryAndUser()', () => {
    test('Should return a registrations-athlete model on load by registrations table with success', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findWithJoin = jest.fn().mockReturnValue(dbLoadByCategoryAndUserModelMock)

      const result = await registrationAthleteRepo.loadByCategoryAndUser({ categoryId: '1', athleteId: '11' })
      expect(result).toStrictEqual(dbLoadByCategoryAndUserModelMock)
      expect(registrationAthleteRepo.findWithJoin).toHaveBeenCalledWith('registrations', 'registrations_id', 'id',
        [
          { field: 'registrations.deleted', value: 'false' },
          { field: 'registrations_athlete.deleted', value: 'false' },
          { field: 'registrations.category_id', value: '1' },
          { field: 'registrations_athlete.athlete_id', value: '11' }
        ])
    })

    test('Should return an array empty if is not exists in database', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findWithJoin = jest.fn().mockReturnValue([])

      const result = await registrationAthleteRepo.loadByCategoryAndUser({ categoryId: '1', athleteId: '11' })
      expect(result?.length).toBe(0)
    })

    test('Should rethrow if loadByRegistrations fails', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.findWithJoin = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationAthleteRepo.loadByCategoryAndUser({ categoryId: '1', athleteId: '11' })
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should delete registrations-athlete', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.delete = jest.fn().mockReturnValue({})

      await registrationAthleteRepo.remove('valid_id')
      expect(registrationAthleteRepo.delete).toHaveBeenCalledWith('valid_id')
    })

    test('Should rethrow if delete fails', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationAthleteRepo.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('removeByRegistration()', () => {
    test('Should deleteByField registrations-athlete', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.deleteByField = jest.fn().mockReturnValue({})

      await registrationAthleteRepo.removeByRegistration('registrationId')
      expect(registrationAthleteRepo.deleteByField).toHaveBeenCalledWith({ registrations_id: 'registrationId' })
    })

    test('Should rethrow if delete fails', async () => {
      const registrationAthleteRepo = new RegistrationsAthletePostgresRepository()
      registrationAthleteRepo.deleteByField = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationAthleteRepo.removeByRegistration('registrationId')
      await expect(promise).rejects.toThrow()
    })
  })
})

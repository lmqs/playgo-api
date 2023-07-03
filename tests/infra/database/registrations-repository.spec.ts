import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { addRegisterCategoryModelMock, dbRegisterCategoryModelMock } from './registrations-repository-mock'

describe('Registrations Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a register-category model on add success', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.create = jest.fn().mockReturnValue(dbRegisterCategoryModelMock)

      const result = await registrationsRepo.add(addRegisterCategoryModelMock)
      expect(result).toStrictEqual({
        id: '1',
        categoryId: 'any_category',
        registrationDate: '24/06/2023',
        deleted: false
      })
    })

    test('Should rethrow if create fails', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationsRepo.add(addRegisterCategoryModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a register-category model on load with success', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.findGeneric = jest.fn().mockReturnValue([dbRegisterCategoryModelMock])

      const result = await registrationsRepo.loadById('1')
      expect(result).toStrictEqual({
        id: '1',
        categoryId: 'any_category',
        registrationDate: '24/06/2023',
        deleted: false
      })
    })

    test('Should return undefined if is not exists in database', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registrationsRepo.loadById('id')
      expect(result).toBeUndefined()
    })

    test('Should rethrow if loadById fails', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationsRepo.loadById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByCategory()', () => {
    test('Should return a register-category model on loadByCategory with success', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.findGeneric = jest.fn().mockReturnValue([dbRegisterCategoryModelMock])

      const result = await registrationsRepo.loadByCategory('1')
      expect(result).toStrictEqual([{
        id: '1',
        categoryId: 'any_category',
        registrationDate: '24/06/2023',
        deleted: false
      }])
    })

    test('Should return undefined if is not exists in database', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registrationsRepo.loadByCategory('1')
      expect(result.length).toBe(0)
    })

    test('Should rethrow if loadByCategory fails', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationsRepo.loadByCategory('1')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should deleteByField register-category', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.deleteByField = jest.fn().mockReturnValue({})

      await registrationsRepo.remove('valid_id')
      expect(registrationsRepo.deleteByField).toHaveBeenCalledWith({ id: 'valid_id' })
    })

    test('Should rethrow if create fails', async () => {
      const registrationsRepo = new RegistrationsPostgresRepository()
      registrationsRepo.deleteByField = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registrationsRepo.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

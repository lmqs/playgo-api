import { RegisterCategoryPostgresRepository } from '@/infra/database/postgres/register-category/register-category-repository'
import { addRegisterCategoryModelMock, dbRegisterCategoryModelMock } from './register-category-repository-mock'

describe('Register-category Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a register-category model on add success', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.create = jest.fn().mockReturnValue(dbRegisterCategoryModelMock)

      const result = await registerCatRepo.add(addRegisterCategoryModelMock)
      expect(result).toStrictEqual({
        id: '1',
        categoryId: 'any_category',
        registerDate: '24/06/2023',
        deleted: false
      })
    })

    test('Should rethrow if create fails', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.add(addRegisterCategoryModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a register-category model on load with success', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([dbRegisterCategoryModelMock])

      const result = await registerCatRepo.loadById('1')
      expect(result).toStrictEqual({
        id: '1',
        categoryId: 'any_category',
        registerDate: '24/06/2023',
        deleted: false
      })
    })

    test('Should return undefined if is not exists in database', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registerCatRepo.loadById('id')
      expect(result).toBeUndefined()
    })

    test('Should rethrow if loadById fails', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.loadById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByCategory()', () => {
    test('Should return a register-category model on loadByCategory with success', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([dbRegisterCategoryModelMock])

      const result = await registerCatRepo.loadByCategory('1')
      expect(result).toStrictEqual([{
        id: '1',
        categoryId: 'any_category',
        registerDate: '24/06/2023',
        deleted: false
      }])
    })

    test('Should return undefined if is not exists in database', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registerCatRepo.loadByCategory('1')
      expect(result.length).toBe(0)
    })

    test('Should rethrow if loadByCategory fails', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.loadByCategory('1')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should delete register-category', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.delete = jest.fn().mockReturnValue({})

      await registerCatRepo.remove('valid_id')
      expect(registerCatRepo.delete).toHaveBeenCalledWith('valid_id')
    })

    test('Should rethrow if create fails', async () => {
      const registerCatRepo = new RegisterCategoryPostgresRepository()
      registerCatRepo.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

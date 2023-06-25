import { RegisterCategoryAthletePostgresRepository } from '@/infra/database/postgres/register-category-athlete/register-category-athlete-repository'
import { addRegisterCategoryAthleteModelMock, dbRegisterCategoryAthleteModelMock } from './register-category-athlete-repository-mock'

describe('Register-category-athlete Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a register-category-athlete model on add success', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.create = jest.fn().mockReturnValue(dbRegisterCategoryAthleteModelMock)

      const result = await registerCatRepo.add(addRegisterCategoryAthleteModelMock)
      expect(result).toStrictEqual({
        id: '1',
        registerCategoryId: 'any_register_category',
        athleteId: 'any_athlete',
        isPay: false,
        deleted: false
      })
    })

    test('Should rethrow if create fails', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.add(addRegisterCategoryAthleteModelMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return a register-category-athlete-athlete model on load with success', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([dbRegisterCategoryAthleteModelMock])

      const result = await registerCatRepo.loadById('1')
      expect(result).toStrictEqual({
        id: '1',
        registerCategoryId: 'any_register_category',
        athleteId: 'any_athlete',
        isPay: false,
        deleted: false
      })
    })

    test('Should return undefined if is not exists in database', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registerCatRepo.loadById('id')
      expect(result).toBeUndefined()
    })

    test('Should rethrow if loadById fails', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.loadById('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByRegisterCategoryId()', () => {
    test('Should return a register-category-athlete model on load with success', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([dbRegisterCategoryAthleteModelMock])

      const result = await registerCatRepo.loadByRegisterCategory('1')
      expect(result).toStrictEqual([{
        id: '1',
        registerCategoryId: 'any_register_category',
        athleteId: 'any_athlete',
        isPay: false,
        deleted: false
      }])
    })

    test('Should return an array empty if is not exists in database', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockReturnValue([])

      const result = await registerCatRepo.loadByRegisterCategory('id')
      expect(result?.length).toBe(0)
    })

    test('Should rethrow if loadByRegisterCategory fails', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.loadByRegisterCategory('id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('remove()', () => {
    test('Should delete register-category-athlete', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.delete = jest.fn().mockReturnValue({})

      await registerCatRepo.remove('valid_id')
      expect(registerCatRepo.delete).toHaveBeenCalledWith('valid_id')
    })

    test('Should rethrow if create fails', async () => {
      const registerCatRepo = new RegisterCategoryAthletePostgresRepository()
      registerCatRepo.delete = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = registerCatRepo.remove('valid_id')
      await expect(promise).rejects.toThrow()
    })
  })
})

import { ICategoryRepository } from '@/data/protocols/db'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { RemoveCategoryUseCase } from '@/data/usescases/category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { registrationsByCategoryMock } from './category-mock'

describe('RemoveCategory UseCase', () => {
  let categoryRepo: ICategoryRepository
  let registrationRepo: IRegistrationsRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
    registrationRepo = new RegistrationsPostgresRepository()
  })

  test('Should delete an category with success', async () => {
    const removeSpy = jest.spyOn(categoryRepo, 'remove').mockResolvedValueOnce()
    const loadRegistrationSpy = jest.spyOn(registrationRepo, 'loadByCategory').mockResolvedValueOnce([])

    const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo, registrationRepo)
    await removeCategoryUseCase.remove('valid_id')
    expect(removeSpy).toHaveBeenCalledWith('valid_id')
    expect(removeSpy).toHaveBeenCalledTimes(1)
    expect(loadRegistrationSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should throw if there are already registration in the category', async () => {
    const removeSpy = jest.spyOn(categoryRepo, 'remove').mockResolvedValueOnce()
    const loadRegistrationSpy = jest.spyOn(registrationRepo, 'loadByCategory').mockResolvedValueOnce(registrationsByCategoryMock)

    const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo, registrationRepo)
    const promise = removeCategoryUseCase.remove('valid_id')
    await expect(promise).rejects.toThrow()

    expect(removeSpy).toHaveBeenCalledTimes(0)
    expect(loadRegistrationSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should throw if removeCategoryRepository.remove throws', async () => {
    const loadRegistrationSpy = jest.spyOn(registrationRepo, 'loadByCategory').mockResolvedValueOnce([])
    const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo, registrationRepo)
    const removeSpy = jest.spyOn(categoryRepo, 'remove').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = removeCategoryUseCase.remove('valid_id')
    await expect(promise).rejects.toThrow()
    expect(removeSpy).toHaveBeenCalledTimes(1)
    expect(loadRegistrationSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if registrationsRepository.loadByCategory throws', async () => {
    const loadRegistrationSpy = jest.spyOn(registrationRepo, 'loadByCategory').mockReturnValueOnce(Promise.reject(new Error()))
    const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo, registrationRepo)
    const removeSpy = jest.spyOn(categoryRepo, 'remove')

    const promise = removeCategoryUseCase.remove('valid_id')
    await expect(promise).rejects.toThrow()
    expect(removeSpy).toHaveBeenCalledTimes(0)
    expect(loadRegistrationSpy).toHaveBeenCalledTimes(1)
  })
})

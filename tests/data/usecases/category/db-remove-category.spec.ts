import { ICategoryRepository } from '@/data/protocols/db'
import { RemoveCategoryUseCase } from '@/data/usescases/category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('RemoveCategory UseCase', () => {
  let categoryRepo: ICategoryRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
  })

  test('Should call remove with correct values', async () => {
    const removeSpy = jest.spyOn(categoryRepo, 'remove')

    const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo)

    await removeCategoryUseCase.remove('valid_id')
    expect(removeSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should delete an category with success', async () => {
    jest.spyOn(categoryRepo, 'remove').mockResolvedValueOnce()

    const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo)
    await removeCategoryUseCase.remove('valid_id')
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo)
    jest.spyOn(categoryRepo, 'remove').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = removeCategoryUseCase.remove('valid_id')
    await expect(promise).rejects.toThrow()
  })
})

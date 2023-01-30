import { mockCategoryModel } from '@/tests/domain/mocks/mock-category'
import { AddCategory } from '@/presentation/controllers/category'

export const mockAddCategoryStub = (): AddCategory => {
  class AddAccountStub implements AddCategory {
    async add (account: AddCategory.Params): Promise<AddCategory.Result> {
      return await new Promise(resolve => { resolve(mockCategoryModel()) })
    }
  }
  return new AddAccountStub()
}

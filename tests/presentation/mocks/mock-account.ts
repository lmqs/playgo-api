import { mockCategoryModel } from '@/tests/domain/mocks/mock-category'
import { AddCategory, AddCategoryParams, CategoryModel } from '../controllers/category/add-category/add-category-controller-protocols'

export const mockAddCategoryStub = (): AddCategory => {
  class AddAccountStub implements AddCategory {
    async add (account: AddCategoryParams): Promise<CategoryModel> {
      return await new Promise(resolve => { resolve(mockCategoryModel()) })
    }
  }
  return new AddAccountStub()
}

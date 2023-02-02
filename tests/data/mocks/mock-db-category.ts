
import { AddCategoryRepository } from '@/data/protocols/db/category'
import { AddCategory } from '@/presentation/controllers/category'
import { mockCategoryModel } from '@/tests/domain/mocks/mock-category'

export const mockAddCategoryRepository = (): AddCategoryRepository => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (category: AddCategory.Params): Promise<AddCategory.Result | undefined> {
      return mockCategoryModel()
    }
  }
  return new AddCategoryRepositoryStub()
}

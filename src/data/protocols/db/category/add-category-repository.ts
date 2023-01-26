import { CategoryModel } from '../../../../domain/models/category'
import { AddCategoryParams } from '../../../../domain/usecases/category/add-category'

export interface AddCategoryRepository {
  add: (category: AddCategoryParams) => Promise<CategoryModel | undefined >
}

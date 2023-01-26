import { CategoryModel } from '../../../../domain/models/category'
import { AddCategoryModel } from '../../../../domain/usecases/category/add-category'

export interface AddCategoryRepository {
  add: (category: AddCategoryModel) => Promise<CategoryModel | undefined >
}

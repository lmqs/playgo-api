import { CategoryModel } from '../../../../../domain/models/category'

export interface LoadCategoryByDescriptionAndIdRepository {
  loadByDescriptionAndId: (description: string, id: string) => Promise<CategoryModel[] | undefined>
}

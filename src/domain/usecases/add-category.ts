import { CategoryModel } from '../../domain/models/category'

export interface AddCategoryModel {
  description: string
  tournamentId: string
  numberAthletes: string
}

export interface AddCategory {
  add: (category: AddCategoryModel) => Promise<CategoryModel | undefined>
}

import { CategoryModel } from '../../domain/models/category'

export interface AddCategoryModel {
  description: string
  tournamentId: number
  numberAthletes: number
}

export interface AddCategory {
  add: (category: AddCategoryModel) => Promise<CategoryModel | undefined>
}

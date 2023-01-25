import { CategoryModel } from '../../../domain/models/category'

export type AddCategoryModel = {
  description: string
  tournamentId: string
  numberAthletes?: string
}

export interface AddCategory {
  add: (category: AddCategoryModel) => Promise<CategoryModel | undefined>
}

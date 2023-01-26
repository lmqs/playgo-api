import { CategoryModel } from '../../../domain/models/category'

export type AddCategoryParams = {
  description: string
  tournamentId: string
  numberAthletes?: string
}

export interface AddCategory {
  add: (category: AddCategoryParams) => Promise<CategoryModel | undefined>
}

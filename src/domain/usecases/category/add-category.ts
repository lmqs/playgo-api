import { CategoryModel } from '../../../domain/models/category'

export type AddCategoryParams = {
  description: string
  tournamentId: string
  numberAthletes?: string
}

export interface AddCategory {
  add: (category: AddCategory.Params) => Promise<AddCategory.Result | undefined>
}

export namespace AddCategory {
  export type Params = {
    description: string
    tournamentId: string
    numberAthletes?: string
  }
  export type Result = CategoryModel
}

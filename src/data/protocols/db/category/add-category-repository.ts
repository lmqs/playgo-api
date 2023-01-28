import { CategoryModel } from '@/domain/models/category'

export interface AddCategoryRepository {
  add: (category: AddCategoryRepository.Params) => Promise<AddCategoryRepository.Result | undefined >
}

export namespace AddCategoryRepository {
  export type Params = {
    description: string
    tournamentId: string
    numberAthletes?: string
  }
  export type Result = CategoryModel
}

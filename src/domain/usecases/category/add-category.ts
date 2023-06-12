import { CategoryModel } from '@/domain/models/category'

export interface IAddCategory {
  add: (category: IAddCategory.Params) => Promise<IAddCategory.Result>
}

export namespace IAddCategory {
  export type Params = {
    description: string
    tournamentId: string
    numberAthletes?: string
  }
  export type Result = CategoryModel
}

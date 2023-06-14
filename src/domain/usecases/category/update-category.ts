import { CategoryModel } from '@/domain/models/category'

export interface IUpdateCategory {
  update: (category: IUpdateCategory.Params) => Promise<IUpdateCategory.Result>
}

export namespace IUpdateCategory {
  export type Params = CategoryModel
  export type Result = CategoryModel
}

import { CategoryModel } from '@/domain/models/category'

export interface ILoadCategoryById {
  loadById: (id: string) => Promise<ILoadCategoryById.Result | undefined>
}

export namespace ILoadCategoryById {
  export type Result = CategoryModel
}

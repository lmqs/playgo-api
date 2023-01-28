import { CategoryModel } from '../../../../domain/models/category'

export interface LoadCategoryByDescriptionAndIdRepository {
  loadByDescriptionAndId: (description: string, id: string) => Promise<LoadCategoryByDescriptionAndIdRepository.Result | undefined>
}

export namespace LoadCategoryByDescriptionAndIdRepository {
  export type Result = CategoryModel[]
}

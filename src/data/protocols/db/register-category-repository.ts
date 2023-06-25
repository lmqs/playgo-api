import { RegisterCategoryModel } from '@/domain/models/register-category'

export interface IRegisterCategoryRepository {
  add: (data: IRegisterCategoryRepository.AddParams) => Promise<IRegisterCategoryRepository.Result>
  loadById: (id: string) => Promise<IRegisterCategoryRepository.Result | undefined>
  loadByCategory: (categoryId: string) => Promise<IRegisterCategoryRepository.LoadResult>
  remove: (id: string) => Promise<void>
}

export namespace IRegisterCategoryRepository {
  export type AddParams = {
    categoryId: string
    registerDate: string
  }
  export type LoadResult = RegisterCategoryModel[]
  export type Result = RegisterCategoryModel
}

export const dataModelToDbModelMapRegisterCategory = (registerCategoryModel: IRegisterCategoryRepository.AddParams): any => {
  return {
    category_id: registerCategoryModel.categoryId,
    register_date: registerCategoryModel.registerDate
  }
}

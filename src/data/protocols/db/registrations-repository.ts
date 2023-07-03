import { RegistrationsModel } from '@/domain/models/registrations'

export interface IRegistrationsRepository {
  add: (data: IRegistrationsRepository.AddParams) => Promise<IRegistrationsRepository.Result>
  loadById: (id: string) => Promise<IRegistrationsRepository.Result | undefined>
  loadByCategory: (categoryId: string) => Promise<IRegistrationsRepository.LoadResult>
  remove: (id: string) => Promise<void>
}

export namespace IRegistrationsRepository {
  export type AddParams = {
    categoryId: string
    registrationDate: string
  }
  export type LoadResult = RegistrationsModel[]
  export type Result = RegistrationsModel
}

export const dataModelToDbModelMapRegistrations = (registerCategoryModel: IRegistrationsRepository.AddParams): any => {
  return {
    category_id: registerCategoryModel.categoryId,
    registration_date: registerCategoryModel.registrationDate
  }
}

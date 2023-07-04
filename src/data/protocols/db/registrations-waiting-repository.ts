import { RegistrationsWaitingModel } from '@/domain/models/registrations-waiting'

export interface IRegistrationsWaitingRepository {
  add: (data: IRegistrationsWaitingRepository.AddParams) => Promise<IRegistrationsWaitingRepository.Result>
  loadById: (id: string) => Promise<IRegistrationsWaitingRepository.Result | undefined>
  loadByCategory: (categoryId: string) => Promise<IRegistrationsWaitingRepository.LoadResult>
  remove: (id: string) => Promise<void>
}

export namespace IRegistrationsWaitingRepository {
  export type AddParams = {
    categoryId: string
  }
  export type LoadResult = RegistrationsWaitingModel[]
  export type Result = RegistrationsWaitingModel
}

export const dataModelToDbModelMapRegistrationsWaiting = (
  registrationsWaitingModel: IRegistrationsWaitingRepository.AddParams
): any => {
  return {
    category_id: registrationsWaitingModel.categoryId
  }
}

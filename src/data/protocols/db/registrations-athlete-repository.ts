import { RegistrationsAthleteModel } from '@/domain/models/registrations-athlete'

export interface IRegistrationsAthleteRepository {
  add: (data: IRegistrationsAthleteRepository.AddParams) => Promise<IRegistrationsAthleteRepository.Result>
  loadById: (id: string) => Promise<IRegistrationsAthleteRepository.Result | undefined>
  loadByRegistrations: (registrationsId: string) => Promise<IRegistrationsAthleteRepository.LoadResult>
  loadByCategoryAndUser: (data: IRegistrationsAthleteRepository.LoadByCategoryAndUserParams) => Promise<any[]>
  loadByCategory: (categoryId: string) => Promise<IRegistrationsAthleteRepository.LoadCategoryResult[]>
  remove: (id: string) => Promise<void>
  removeByRegistration: (registrationId: string) => Promise<void>
}

export namespace IRegistrationsAthleteRepository {
  export type AddParams = {
    registrationsId: string
    athleteId: string
    isPay: boolean
  }
  export type LoadResult = RegistrationsAthleteModel[]
  export type Result = RegistrationsAthleteModel
  export type LoadByCategoryAndUserParams = {
    categoryId: string
    athleteId: string
  }
  export type LoadCategoryResult = RegistrationsAthleteModel
}

export const dataModelToDbModelMapRegistrationsAthlete = (
  registerCategoryAthleteModel: IRegistrationsAthleteRepository.AddParams
): any => {
  return {
    registrations_id: registerCategoryAthleteModel.registrationsId,
    athlete_id: registerCategoryAthleteModel.athleteId,
    is_pay: registerCategoryAthleteModel.isPay

  }
}

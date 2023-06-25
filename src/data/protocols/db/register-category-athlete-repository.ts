import { RegisterCategoryAthleteModel } from '@/domain/models/register-category-athlete'

export interface IRegisterCategoryAthleteAthleteRepository {
  add: (data: IRegisterCategoryAthleteAthleteRepository.AddParams) => Promise<IRegisterCategoryAthleteAthleteRepository.Result>
  loadById: (id: string) => Promise<IRegisterCategoryAthleteAthleteRepository.Result | undefined>
  loadByRegisterCategory: (registerCategoryId: string) => Promise<IRegisterCategoryAthleteAthleteRepository.LoadResult>
  remove: (id: string) => Promise<void>
}

export namespace IRegisterCategoryAthleteAthleteRepository {
  export type AddParams = {
    registerCategoryId: string
    athleteId: string
    isPay: boolean
  }
  export type LoadResult = RegisterCategoryAthleteModel[]
  export type Result = RegisterCategoryAthleteModel
}

export const dataModelToDbModelMapRegisterCategoryAthlete = (
  registerCategoryAthleteModel: IRegisterCategoryAthleteAthleteRepository.AddParams
): any => {
  return {
    register_category_id: registerCategoryAthleteModel.registerCategoryId,
    athlete_id: registerCategoryAthleteModel.athleteId,
    is_pay: registerCategoryAthleteModel.isPay

  }
}

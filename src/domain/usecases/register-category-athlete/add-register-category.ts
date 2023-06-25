import { RegisterCategoryAthleteModel } from '@/domain/models/register-category-athlete'

export interface IAddRegisterCategoryAthlete {
  add: (registerCategoryAthlete: IAddRegisterCategoryAthlete.Params) => Promise<IAddRegisterCategoryAthlete.Result>
}

export namespace IAddRegisterCategoryAthlete {
  export type Params = {
    registerCategoryId: string
    athleteId: string
    isPay: boolean
  }
  export type Result = RegisterCategoryAthleteModel
}

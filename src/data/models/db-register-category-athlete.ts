import { RegisterCategoryAthleteModel } from '@/domain/models/register-category-athlete'

export type InputDbRegisterCategoryAthleteModel = {
  registerCategoryId: string
  athleteId: string
  isPay: boolean
  deleted?: boolean
}

export type OutputDbRegisterCategoryAthleteModel = {
  id: string
  register_category_id: string
  athlete_id: string
  is_pay: boolean
  deleted?: boolean
}

export const dbModelToDataModelMapRegisterCategoryAthlete =
(dbRegisterCategoryAthlete: OutputDbRegisterCategoryAthleteModel): RegisterCategoryAthleteModel => {
  return (
    dbRegisterCategoryAthlete && {
      id: dbRegisterCategoryAthlete.id,
      registerCategoryId: dbRegisterCategoryAthlete.register_category_id,
      athleteId: dbRegisterCategoryAthlete.athlete_id,
      isPay: dbRegisterCategoryAthlete.is_pay,
      deleted: dbRegisterCategoryAthlete.deleted
    }
  )
}

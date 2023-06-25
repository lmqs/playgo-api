import { InputDbRegisterCategoryAthleteModel, OutputDbRegisterCategoryAthleteModel } from '@/data/models/db-register-category-athlete'

export const addRegisterCategoryAthleteModelMock: InputDbRegisterCategoryAthleteModel = {
  registerCategoryId: 'any_register_category',
  athleteId: 'any_athlete',
  isPay: false
}

export const dbRegisterCategoryAthleteModelMock: OutputDbRegisterCategoryAthleteModel = {
  id: '1',
  register_category_id: 'any_register_category',
  athlete_id: 'any_athlete',
  is_pay: false,
  deleted: false
}

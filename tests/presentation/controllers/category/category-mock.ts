import { CategoryModel } from '@/domain/models/category'
import { AddCategoryController, LoadCategoriesByTournamentIdController, RemoveCategoryController } from '.'
import { UpdateCategoryController } from './update-category-controller'

export const requestCategoryMock: AddCategoryController.Request = {
  description: 'valid_user',
  tournamentId: 'valid_password',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration'
}

export const categoryModelMock: CategoryModel = {
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration'
}

export const requestCategoryLoadByTournamentMock: LoadCategoriesByTournamentIdController.Request = {
  tournamentId: 'valid_tournamentId'
}

export const requestRemoveCategoryMock: RemoveCategoryController.Request = {
  id: 'valid_id'
}

export const requestUpdateCategoryMock: UpdateCategoryController.Request = {
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration'
}

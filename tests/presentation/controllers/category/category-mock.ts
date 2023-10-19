import { CategoryModel } from '@/domain/models/category'
import { AddCategoryController, LoadCategoriesByTournamentIdController, RemoveCategoryController } from '.'
import { UpdateCategoryController } from './update-category-controller'
import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournament-id'

export const requestCategoryMock: AddCategoryController.Request = {
  description: 'valid_user',
  tournamentId: 'valid_password',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration'
}

export const dbCategoryModelMock: CategoryModel = {
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration',
  numberRegistration: 10,
  deleted: false
}

export const categoryModelMock: ILoadCategoriesByTournamentId.Result = [{
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration',
  numberRegistration: 10,
  deleted: false,
  isUserLoggedRegistered: false
}]

export const requestCategoryLoadByTournamentMock: LoadCategoriesByTournamentIdController.Request = {
  tournamentId: 'valid_tournamentId',
  accountId: '10'
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

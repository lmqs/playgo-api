import { CategoryRepoModel } from '@/data/models/db-category'
import { IAddCategory } from '@/domain/usecases/category/add-category'
import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournament-id'

export const addCategoryModelMock: IAddCategory.Params = {
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration'
}

export const categoryModelMock: CategoryRepoModel = {
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration',
  deleted: false
}

export const categoryResultModelMock: ILoadCategoriesByTournamentId.Result = [{
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes',
  numberAthletesRegistration: 'valid_numberAthletesRegistration',
  numberRegistration: 0,
  deleted: false
}]

export const registrationsByCategoryMock = [{
  id: '43',
  categoryId: '12',
  registrationDate: '20/10/2023',
  deleted: false
},
{
  id: '44',
  categoryId: '12',
  registrationDate: '20/10/2023',
  deleted: false
}]

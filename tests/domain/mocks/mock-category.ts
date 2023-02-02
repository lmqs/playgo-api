import { CategoryModel } from '@/domain/models/category'
import { AddCategory } from '../usecases/category/add-category'

export const mockCategoryModel = (): CategoryModel => ({
  id: 'valid_id',
  description: 'valid_user',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})

export const mockAddCategoryModel = (): AddCategory.Params => ({
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})

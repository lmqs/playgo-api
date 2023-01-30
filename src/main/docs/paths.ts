import {
  loginPath,
  signupPath,
  loadCategoryPath,
  addCategoryPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/loadCategoriesByTournamentId': loadCategoryPath,
  '/category': addCategoryPath
}

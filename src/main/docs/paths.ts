import {
  loginPath,
  signupPath,
  loadCategoryPath,
  addCategoryPath,
  tournamentPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/loadCategoriesByTournamentId': loadCategoryPath,
  '/category': addCategoryPath,
  '/tournament': tournamentPath
}

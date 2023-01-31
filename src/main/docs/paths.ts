import {
  loginPath,
  signupPath,
  loadCategoryPath,
  addCategoryPath,
  addTournamentPath,
  loadTournamentPath,
  addSportPath,
  sportPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/loadCategoriesByTournamentId': loadCategoryPath,
  '/category': addCategoryPath,
  '/tournament': addTournamentPath,
  '/tournaments': loadTournamentPath,
  '/sport': addSportPath,
  '/sports': sportPath
}

import {
  loginPath,
  signupPath,
  loadCategoryPath,
  addCategoryPath,
  addTournamentPath,
  loadTournamentPath,
  removeTournamentPath,
  addSportPath,
  sportPath,
  updateCategoryPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/loadCategoriesByTournamentId': loadCategoryPath,
  '/category': addCategoryPath,
  '/category/{id}': updateCategoryPath,
  '/tournament': addTournamentPath,
  '/tournaments': loadTournamentPath,
  '/tournament/{id}': removeTournamentPath,
  '/sport': addSportPath,
  '/sports': sportPath
}

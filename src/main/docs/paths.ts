import {
  loginPath,
  signupPath,
  loadCategoryPath,
  addCategoryPath,
  tournamentPath,
  addSportPath,
  sportPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/loadCategoriesByTournamentId': loadCategoryPath,
  '/category': addCategoryPath,
  '/tournament': tournamentPath,
  '/sport': addSportPath,
  '/sports': sportPath
}

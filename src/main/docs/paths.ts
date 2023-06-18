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
  updateCategoryPath,
  updateAccountPath,
  loadTournamentSponsorPath,
  removeTournamentSponsorPath,
  addTournamentSponsorPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/account/{id}': updateAccountPath,
  '/loadCategoriesByTournamentId': loadCategoryPath,
  '/category': addCategoryPath,
  '/category/{id}': updateCategoryPath,
  '/tournament': addTournamentPath,
  '/tournaments': loadTournamentPath,
  '/tournament/{id}': removeTournamentPath,
  '/tournament-sponsor': addTournamentSponsorPath,
  '/tournament-sponsor/load-by-tournament': loadTournamentSponsorPath,
  '/tournament-sponsor/{id}': removeTournamentSponsorPath,
  '/sport': addSportPath,
  '/sports': sportPath
}

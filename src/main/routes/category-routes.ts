import { Router } from 'express'
import { makeAddCategoryController } from '../factories/controllers/add-category/add-category-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadCategoriesByTournamentIdController } from '../factories/controllers/load-category/load-categories-by-tournamentId-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/category', adminAuth, adaptRoute(makeAddCategoryController()))
  router.get('/loadCategoriesByTournamentId', auth, adaptRoute(makeLoadCategoriesByTournamentIdController()))
}

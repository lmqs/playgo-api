import { Router } from 'express'
import { adaptMiddleware } from '../../main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../../main/factories/middleware/auth-middleware-factory'
import { makeAddCategoryController } from '../factories/controllers/add-category/add-category-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadCategoriesByTournamentIdController } from '../../main/factories/controllers/load-category/load-categories-by-tournamentId-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  const auth = adaptMiddleware(makeAuthMiddleware(''))
  router.post('/category', adminAuth, adaptRoute(makeAddCategoryController()))
  router.post('/loadCategoriesByTournamentId', auth, adaptRoute(makeLoadCategoriesByTournamentIdController()))
}

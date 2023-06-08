import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'
import { makeRemoveCategoryController, makeLoadCategoriesByTournamentIdController, makeAddCategoryController } from '../factories/controllers/category'

export default (router: Router): void => {
  router.post('/category', adminAuth, adaptRoute(makeAddCategoryController()))
  router.get('/loadCategoriesByTournamentId', auth, adaptRoute(makeLoadCategoriesByTournamentIdController()))
  router.delete('/category', adminAuth, adaptRoute(makeRemoveCategoryController()))
}

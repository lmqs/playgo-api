import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'
import { makeRemoveCategoryController, makeLoadCategoriesByTournamentIdController, makeAddCategoryController, makeUpdateCategoryController } from '../factories/controllers/category'

export default (router: Router): void => {
  router.delete('/category/:id', adminAuth, adaptRoute(makeRemoveCategoryController()))
  router.post('/category', adminAuth, adaptRoute(makeAddCategoryController()))
  router.get('/category/loadByTournament', auth, adaptRoute(makeLoadCategoriesByTournamentIdController()))
  router.put('/category/:id', adminAuth, adaptRoute(makeUpdateCategoryController()))
}

import { Router } from 'express'
import { adaptMiddleware } from 'main/adapters/express-middleware-adapter'
import { makeAuthMiddleware } from 'main/factories/middleware/auth-middleware-factory'
import { makeAddCategoryController } from '../../main/factories/controllers/add-category-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/category', adminAuth, adaptRoute(makeAddCategoryController()))
}

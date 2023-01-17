import { Router } from 'express'
import { makeAddCategoryController } from '../../main/factories/controllers/add-category-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/category', adaptRoute(makeAddCategoryController()))
}

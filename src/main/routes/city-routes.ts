import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth'
import { makeLoadAllCitiesController } from '../factories/controllers/city/load-cities/load-all-cities-controller-factory'

export default (router: Router): void => {
  router.get('/cities', auth, adaptRoute(makeLoadAllCitiesController()))
}

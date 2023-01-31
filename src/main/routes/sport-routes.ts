import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { makeAddSportController } from '../factories/controllers/sport/add-sport/add-sport-controller-factory'
import { makeLoadSportsController } from '../factories/controllers/sport/load-sport/load-sports-controller-factory'

export default (router: Router): void => {
  router.post('/sport', adminAuth, adaptRoute(makeAddSportController()))
  router.get('/sports', adminAuth, adaptRoute(makeLoadSportsController()))
}

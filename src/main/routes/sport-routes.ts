import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { makeAddSportController } from '@/main/factories/controllers/sport/add-sport/add-sport-controller-factory'
import { makeLoadSportsController } from '@/main/factories/controllers/sport/load-sport/load-sports-controller-factory'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/sport', adminAuth, adaptRoute(makeAddSportController()))
  router.get('/sports', auth, adaptRoute(makeLoadSportsController()))
}

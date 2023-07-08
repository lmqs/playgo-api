import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth'
import { makeAddRegistrationsController, makeLoadRegistrationByCategoryIdController } from '@/main/factories/controllers/registrations'

export default (router: Router): void => {
  router.post('/registrations', auth, adaptRoute(makeAddRegistrationsController()))
  router.get('/registrations/loadByCategory', auth, adaptRoute(makeLoadRegistrationByCategoryIdController()))
}

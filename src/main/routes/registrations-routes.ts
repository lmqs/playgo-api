import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth'
import { makeAddRegistrationsController, makeLoadRegistrationByCategoryIdController, makeRemoveRegistrationsController } from '@/main/factories/controllers/registrations'

export default (router: Router): void => {
  router.post('/registerTeam', auth, adaptRoute(makeAddRegistrationsController()))
  router.get('/teamsRegisteredByCategory', auth, adaptRoute(makeLoadRegistrationByCategoryIdController()))
  router.delete('/registerTeam/:id', auth, adaptRoute(makeRemoveRegistrationsController()))
}

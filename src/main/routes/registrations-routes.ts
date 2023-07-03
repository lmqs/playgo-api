import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeAddRegistrationsController } from '../factories/controllers/registrations/add-registrations-controller-factory'

export default (router: Router): void => {
  router.post('/registrations', auth, adaptRoute(makeAddRegistrationsController()))
}

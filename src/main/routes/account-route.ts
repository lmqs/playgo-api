import { Router } from 'express'

import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeUpdateAccountController } from '@/main/factories/controllers/account/update/update-controller-factory'

export default (router: Router): void => {
  router.put('/account/:id', adaptRoute(makeUpdateAccountController()))
}

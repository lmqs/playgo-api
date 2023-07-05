import { Router } from 'express'

import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { auth } from '@/main/middlewares/auth'
import { makeLoadAccountByNameController, makeLoadAccountByTokenController, makeUpdateAccountController } from '@/main/factories/controllers/account'

export default (router: Router): void => {
  router.put('/account/:id', adaptRoute(makeUpdateAccountController()))
  router.get('/account/loadByName', auth, adaptRoute(makeLoadAccountByNameController()))
  router.get('/account/loadByToken', auth, adaptRoute(makeLoadAccountByTokenController()))
}

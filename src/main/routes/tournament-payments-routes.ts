import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { makeAddTournamentPaymentsController, makeLoadAllTournamentPaymentsController, makeRemoveTournamentPaymentsController } from '@/main/factories/controllers/tournament-payments'

export default (router: Router): void => {
  router.post('/tournament-payments', adminAuth, adaptRoute(makeAddTournamentPaymentsController()))
  router.get('/tournament-payments', auth, adaptRoute(makeLoadAllTournamentPaymentsController()))
  router.delete('/tournament-payments/:id', adminAuth, adaptRoute(makeRemoveTournamentPaymentsController()))
}

import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { makeRemoveTournamentsController, makeLoadTournamentsController, makeAddTournamentController, makeLoadTournamentByIdController } from '@/main/factories/controllers/tournament'

export default (router: Router): void => {
  router.post('/tournament', adminAuth, adaptRoute(makeAddTournamentController()))
  router.get('/tournaments', auth, adaptRoute(makeLoadTournamentsController()))
  router.delete('/tournament/:id', adminAuth, adaptRoute(makeRemoveTournamentsController()))
  router.get('/tournament/loadById', auth, adaptRoute(makeLoadTournamentByIdController()))
}

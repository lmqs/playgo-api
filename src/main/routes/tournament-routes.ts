import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeRemoveTournamentsController, makeLoadTournamentsController, makeAddTournamentController } from '@/main/factories/controllers/tournament'

export default (router: Router): void => {
  router.post('/tournament', adminAuth, adaptRoute(makeAddTournamentController()))
  router.get('/tournaments', adminAuth, adaptRoute(makeLoadTournamentsController()))
  router.delete('/tournament/:id', adminAuth, adaptRoute(makeRemoveTournamentsController()))
}

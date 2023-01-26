import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { adminAuth } from '../middlewares/admin-auth'
import { makeAddTournamentController } from '../factories/controllers/tournament/add-tournament/add-tournament-controller-factory'

export default (router: Router): void => {
  router.post('/tournament', adminAuth, adaptRoute(makeAddTournamentController()))
}

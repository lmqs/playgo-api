import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { makeAddTournamentSponsorController, makeLoadByTournamentIdTournamentSponsorController, makeRemoveTournamentSponsorController, makeUpdateTournamentSponsorController } from '@/main/factories/controllers/tournament-sponsor'

export default (router: Router): void => {
  router.post('/tournament-sponsor', adminAuth, adaptRoute(makeAddTournamentSponsorController()))
  router.get('/tournament-sponsor/load-by-tournament', auth, adaptRoute(makeLoadByTournamentIdTournamentSponsorController()))
  router.delete('/tournament-sponsor/:id', adminAuth, adaptRoute(makeRemoveTournamentSponsorController()))
  router.put('/tournament-sponsor/:id', adminAuth, adaptRoute(makeUpdateTournamentSponsorController()))
}

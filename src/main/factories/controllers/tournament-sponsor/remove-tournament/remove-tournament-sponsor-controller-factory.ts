import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeRemoveTournamentSponsorValidation } from './remove-tournament-sponsor-validation-factory'
import { makeRemoveTournamentSponsor } from '@/main/factories/usecases/tournament-sponsor'
import { RemoveTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'

export const makeRemoveTournamentSponsorController = (): Controller => {
  const controller = new RemoveTournamentSponsorController(makeRemoveTournamentSponsorValidation(), makeRemoveTournamentSponsor())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}

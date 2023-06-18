import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeAddTournamentSponsorValidation } from './add-tournament-sponsor-validation-factory'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { AddTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'
import { makeAddTournamentSponsor } from '@/main/factories/usecases/tournament-sponsor'

export const makeAddTournamentSponsorController = (): Controller => {
  const addTournamentController = new AddTournamentSponsorController(makeAddTournamentSponsorValidation(), makeAddTournamentSponsor())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addTournamentController, logPostgresRepository)
}

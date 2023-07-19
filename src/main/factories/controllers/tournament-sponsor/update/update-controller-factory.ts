import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeUpdateTournamentSponsor } from '@/main/factories/usecases/tournament-sponsor/update-tournament-sponsor'
import { makeUpdateTournamentSponsorValidation } from './update-validation-factory'
import { UpdateTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'
import { Controller } from '@/presentation/protocols'

export const makeUpdateTournamentSponsorController = (): Controller => {
  const addTournamentController = new UpdateTournamentSponsorController(
    makeUpdateTournamentSponsorValidation(), makeUpdateTournamentSponsor()
  )
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addTournamentController, logPostgresRepository)
}

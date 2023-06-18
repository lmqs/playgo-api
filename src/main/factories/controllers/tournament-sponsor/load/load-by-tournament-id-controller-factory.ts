import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadByTournamentIdTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'
import { makeLoadTournamentByTournamentId } from '@/main/factories/usecases/tournament-sponsor'
import { makeLoadByTournamentIdTournamentSponsorValidation } from './load-by-tournament-id-validation-factory'

export const makeLoadByTournamentIdTournamentSponsorController = (): Controller => {
  const controller = new LoadByTournamentIdTournamentSponsorController(
    makeLoadByTournamentIdTournamentSponsorValidation(), makeLoadTournamentByTournamentId()
  )
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}

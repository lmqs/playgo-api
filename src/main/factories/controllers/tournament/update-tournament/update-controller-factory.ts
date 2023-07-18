import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeUpdateTournamentValidation } from './update-validation-factory'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { UpdateTournamentController } from '@/presentation/controllers/tournament/update-controller'
import { makeDbUpdateTournament } from '@/main/factories/usecases/tournament/db-update-tournament'

export const makeUpdateTournamentController = (): Controller => {
  const updateTournamentController = new UpdateTournamentController(makeUpdateTournamentValidation(), makeDbUpdateTournament())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(updateTournamentController, logPostgresRepository)
}

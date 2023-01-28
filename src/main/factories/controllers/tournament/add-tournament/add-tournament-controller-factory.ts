import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeAddTournamentValidation } from './add-tournament-validation-factory'
import { AddTournamentController } from '@/presentation/controllers/tournament/add-tournament/add-tournament-controller'
import { makeDbAddTournament } from '@/main/factories/usecases/tournament/add-tournament/db-add-tournament'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeAddTournamentController = (): Controller => {
  const addTournamentController = new AddTournamentController(makeAddTournamentValidation(), makeDbAddTournament())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addTournamentController, logPostgresRepository)
}

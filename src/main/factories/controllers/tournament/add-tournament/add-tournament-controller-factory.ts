import { LogControllerDecorator } from '../../../../decorators/log-controller-decorator'
import { Controller } from '../../../../../presentation/protocols'
import { LogPostgresRepository } from '../../../../../infra/database/postgres/log/log-repository'
import { makeAddTournamentValidation } from './add-tournament-validation-factory'
import { makeDbAddTournament } from '../../../usecases/tournament/add-tournament/db-add-tournament'
import { AddTournamentController } from '../../../../../presentation/controllers/tournament/add-tournament/add-tournament-controller'

export const makeAddTournamentController = (): Controller => {
  const addTournamentController = new AddTournamentController(makeAddTournamentValidation(), makeDbAddTournament())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addTournamentController, logPostgresRepository)
}

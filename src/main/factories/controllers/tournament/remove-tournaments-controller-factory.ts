import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { RemoveTournamentController } from '@/presentation/controllers/tournament/remove-tournament-controller'
import { makeDbRemoveTournament } from '@/main/factories/usecases/tournament'
import { makeRemoveTournamentValidation } from '@/main/factories/controllers/tournament/remove-tournament-validation-factory'

export const makeRemoveTournamentsController = (): Controller => {
  const loadTournamentsController = new RemoveTournamentController(makeRemoveTournamentValidation(), makeDbRemoveTournament())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(loadTournamentsController, logPostgresRepository)
}

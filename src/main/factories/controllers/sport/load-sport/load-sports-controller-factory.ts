import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeDbLoadSports } from '@/main/factories/usecases/sport/db-load-sports'
import { LoadSportsController } from '@/presentation/controllers/sport/load-sports-controller'

export const makeLoadSportsController = (): Controller => {
  const loadSportsController = new LoadSportsController(makeDbLoadSports())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(loadSportsController, logPostgresRepository)
}

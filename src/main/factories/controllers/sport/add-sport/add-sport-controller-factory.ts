import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeAddSportValidation } from './add-sport-validation-factory'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { AddSportController } from '@/presentation/controllers/sport/add-sport-controller'
import { makeDbAddSport } from '@/main/factories/usecases/sport/db-add-sport'

export const makeAddSportController = (): Controller => {
  const addSportController = new AddSportController(makeAddSportValidation(), makeDbAddSport())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addSportController, logPostgresRepository)
}

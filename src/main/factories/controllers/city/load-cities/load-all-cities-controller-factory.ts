import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeDbLoadAllCities } from '@/main/factories/usecases/city/db-load-all-cities'
import { LoadAllCitiesController } from '@/presentation/controllers/city'

export const makeLoadAllCitiesController = (): Controller => {
  const loadAllCitiesController = new LoadAllCitiesController(makeDbLoadAllCities())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(loadAllCitiesController, logPostgresRepository)
}

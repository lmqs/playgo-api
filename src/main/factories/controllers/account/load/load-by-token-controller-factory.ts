import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeDbLoadAccountById } from '@/main/factories/usecases/account/db-load-account-by-id-factory'
import { LoadAccountByTokenController } from '@/presentation/controllers/account/load-by-token-controller'

export const makeLoadAccountByTokenController = (): Controller => {
  const controller = new LoadAccountByTokenController(makeDbLoadAccountById())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}

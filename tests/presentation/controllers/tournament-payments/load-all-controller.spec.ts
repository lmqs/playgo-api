import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { DbLoadAllTournamentPayments } from '@/data/usescases/tournament-payments/load-all'
import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { ILoadAllTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { LoadAllTournamentPaymentsController } from '@/presentation/controllers/tournament-payments/load-all'
import { loadAllModelMock } from './tournament-payments-mock'

describe('RemoveTournamentSponsor Controller', () => {
  let repo: ITournamentPaymentsRepository
  let useCase: ILoadAllTournamentPaymentsUseCase

  beforeEach(async () => {
    repo = new TournamentPaymentsPostgresRepository()
    useCase = new DbLoadAllTournamentPayments(repo)
  })

  test('Should return 500 if useCase.loadAll throws', async () => {
    const controller = new LoadAllTournamentPaymentsController(useCase)
    jest.spyOn(useCase, 'loadAll').mockImplementation(() => { throw new Error() })

    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if useCase return empty', async () => {
    jest.spyOn(useCase, 'loadAll').mockResolvedValueOnce([])

    const controller = new LoadAllTournamentPaymentsController(useCase)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(useCase, 'loadAll').mockResolvedValueOnce(loadAllModelMock)

    const controller = new LoadAllTournamentPaymentsController(useCase)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(ok(loadAllModelMock))
  })
})

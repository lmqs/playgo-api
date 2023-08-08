import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { LoadTournamentByFilterController } from '@/presentation/controllers/tournament'
import { tournamentModelMock } from './load-by-id-controller-mock'
import { ILoadTournamentByFilter } from '@/domain/usecases/tournament/load-tournament-by-filter'
import { makeDbLoadTournamentByFilter } from '@/main/factories/usecases/tournament/db-load-tournament-by-filter'

describe('LoadTournamentByFilterController Controller', () => {
  let useCaseStub: ILoadTournamentByFilter
  beforeEach(() => {
    useCaseStub = makeDbLoadTournamentByFilter()
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(useCaseStub, 'loadDateFilter').mockResolvedValueOnce({
      opened: [tournamentModelMock],
      finished: [tournamentModelMock]
    })

    const controller = new LoadTournamentByFilterController(useCaseStub)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(ok({
      opened: [tournamentModelMock],
      finished: [tournamentModelMock]
    }))
    expect(useCaseStub.loadDateFilter).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if loadDateFilter throws', async () => {
    jest.spyOn(useCaseStub, 'loadDateFilter').mockImplementationOnce(() => {
      throw new Error()
    })
    const controller = new LoadTournamentByFilterController(useCaseStub)

    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

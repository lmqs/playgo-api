import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadTournaments } from '@/domain/usecases/tournament'
import { tournamentModelMock } from './load-by-id-controller-mock'
import { LoadTournamentsController } from '@/presentation/controllers/tournament'
import { makeDbLoadTournaments } from '@/main/factories/usecases/tournament'

describe('LoadTournamentsController Controller', () => {
  let useCaseStub: LoadTournaments
  beforeEach(() => {
    useCaseStub = makeDbLoadTournaments()
  })

  test('Should return 200 if tournaments list is success', async () => {
    jest.spyOn(useCaseStub, 'load').mockResolvedValueOnce([tournamentModelMock])

    const controller = new LoadTournamentsController(useCaseStub)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(ok([tournamentModelMock]))
    expect(useCaseStub.load).toHaveBeenCalledTimes(1)
  })

  test('Should return 204 if is empty list', async () => {
    jest.spyOn(useCaseStub, 'load').mockResolvedValueOnce([])

    const controller = new LoadTournamentsController(useCaseStub)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(noContent())
    expect(useCaseStub.load).toHaveBeenCalledTimes(1)
  })

  test('Should return 500 if load throws', async () => {
    jest.spyOn(useCaseStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const controller = new LoadTournamentsController(useCaseStub)

    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})

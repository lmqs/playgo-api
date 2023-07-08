import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { loadByIdMock, requestLoadByTokenMock } from './account-mock'
import { LoadAccountByTokenController } from '@/presentation/controllers/account/load-by-token-controller'
import { ILoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { DbLoadAccountByIdUseCase } from '@/data/usescases/account/db-load-account-by-id'

describe('LoadAccountByToken Controller', () => {
  let loadAccountByTokenUseCaseStub: ILoadAccountById

  beforeEach(() => {
    const accountRepository = new AccountPostgresRepository()
    loadAccountByTokenUseCaseStub = new DbLoadAccountByIdUseCase(accountRepository)
  })

  test('Should call loadAccountByNameUseCase.loadById with correct values', async () => {
    const controller = new LoadAccountByTokenController(loadAccountByTokenUseCaseStub)

    const loadSpy = jest.spyOn(loadAccountByTokenUseCaseStub, 'loadById').mockResolvedValueOnce(loadByIdMock)

    await controller.handle(requestLoadByTokenMock)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith(requestLoadByTokenMock.accountId)
  })

  test('Should return 500 if loadAccountByNameUseCase.loadById throws', async () => {
    const controller = new LoadAccountByTokenController(loadAccountByTokenUseCaseStub)
    jest.spyOn(loadAccountByTokenUseCaseStub, 'loadById').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await controller.handle(requestLoadByTokenMock)
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 200 if valid account is provider', async () => {
    jest.spyOn(loadAccountByTokenUseCaseStub, 'loadById').mockResolvedValueOnce(loadByIdMock)

    const controller = new LoadAccountByTokenController(loadAccountByTokenUseCaseStub)

    const httpResponse = await controller.handle(requestLoadByTokenMock)
    expect(httpResponse).toEqual(ok(loadByIdMock))
  })
})

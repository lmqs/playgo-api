import { IUpdateAccount } from '@/domain/usecases/account/update-account'
import { MissingParamError, EmailInUseError } from '@/presentation/errors'
import { ok, badRequest, serverError, forbidden } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { ValidationComposite } from '@/presentation/validation/validators'
import { requestUpdateMock, updateAccountModelUseCaseMock } from './account-mock'
import { DbUpdateAccountUseCase } from '@/data/usescases/account/db-update-account'
import { UpdateAccountController } from '@/presentation/controllers/account/update-account-controller'

describe('Update Controller', () => {
  let validationStub: Validation
  let updateAccountUseCaseStub: IUpdateAccount

  beforeEach(() => {
    const accountRepository = new AccountPostgresRepository()
    updateAccountUseCaseStub = new DbUpdateAccountUseCase(accountRepository)

    const validations: Validation[] = []
    validationStub = new ValidationComposite(validations)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(updateAccountUseCaseStub, 'update').mockResolvedValueOnce(updateAccountModelUseCaseMock)

    const signUpController = new UpdateAccountController(updateAccountUseCaseStub, validationStub)

    const validationSpy = jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    await signUpController.handle(requestUpdateMock)
    expect(validationSpy).toHaveBeenCalledTimes(1)
    expect(validationSpy).toHaveBeenCalledWith(requestUpdateMock)
  })

  test('Should return 400 if validation returns an error', async () => {
    const signUpController = new UpdateAccountController(updateAccountUseCaseStub, validationStub)

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await signUpController.handle(requestUpdateMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call updateAccountUseCase.update with correct values', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    const signUpController = new UpdateAccountController(updateAccountUseCaseStub, validationStub)

    const updateSpy = jest.spyOn(updateAccountUseCaseStub, 'update').mockResolvedValueOnce(updateAccountModelUseCaseMock)

    await signUpController.handle(requestUpdateMock)
    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith(requestUpdateMock)
  })

  test('Should return 500 if updateAccountUseCase.update throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    const signUpController = new UpdateAccountController(updateAccountUseCaseStub, validationStub)
    jest.spyOn(updateAccountUseCaseStub, 'update').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await signUpController.handle(requestUpdateMock)
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 403 if updateAccountUseCase.update throws EmailInUseError', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    const signUpController = new UpdateAccountController(updateAccountUseCaseStub, validationStub)
    jest.spyOn(updateAccountUseCaseStub, 'update').mockImplementationOnce(() => {
      throw new EmailInUseError()
    })

    const httpResponse = await signUpController.handle(requestUpdateMock)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(updateAccountUseCaseStub, 'update').mockResolvedValueOnce(updateAccountModelUseCaseMock)

    const signUpController = new UpdateAccountController(updateAccountUseCaseStub, validationStub)

    const httpResponse = await signUpController.handle(requestUpdateMock)
    expect(httpResponse).toEqual(ok({
      id: 'valid_id',
      name: 'valid_name',
      gender: 'valid_gender',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      dateBirthday: '13/06/2020'
    }))
  })
})

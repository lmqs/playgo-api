import { IAccountRepository, IRegistrationsRepository } from '@/data/protocols/db'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { LoadRegistrationByCategoryIdUseCase } from '@/data/usescases/registrations/db-load-by-category-id'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import { loadRegistrationAthleteByRegistrationModelMock, loadRegistrationsByCategoryMock } from './db-load-by-category-mock'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'

describe('DbAddCategory UseCase', () => {
  let accountRepo: IAccountRepository
  let registrationsAthleteRepo: IRegistrationsAthleteRepository
  let registrationsRepo: IRegistrationsRepository

  beforeEach(async () => {
    accountRepo = new AccountPostgresRepository()
    registrationsAthleteRepo = new RegistrationsAthletePostgresRepository()
    registrationsRepo = new RegistrationsPostgresRepository()
  })

  test('Should throw registrationsRepo.loadByCategory throw', async () => {
    jest.spyOn(registrationsRepo, 'loadByCategory').mockImplementation(() => {
      throw new Error()
    })
    const useCase = new LoadRegistrationByCategoryIdUseCase(registrationsRepo, registrationsAthleteRepo, accountRepo)
    const promise = useCase.loadByCategoryId({ categoryId: '1', accountId: '1' })
    await expect(promise).rejects.toThrow()
    expect(registrationsRepo.loadByCategory).toHaveBeenCalledWith('1')
  })

  test('Should throw registrationsAthleteRepo.loadByRegistrations throw', async () => {
    jest.spyOn(registrationsRepo, 'loadByCategory').mockResolvedValueOnce(loadRegistrationsByCategoryMock)
    jest.spyOn(registrationsAthleteRepo, 'loadByRegistrations').mockImplementationOnce(() => {
      throw new Error()
    }).mockImplementation(() => {
      throw new Error()
    })
    const useCase = new LoadRegistrationByCategoryIdUseCase(registrationsRepo, registrationsAthleteRepo, accountRepo)
    const promise = useCase.loadByCategoryId({ categoryId: '1', accountId: '1' })
    await expect(promise).rejects.toThrow()
    expect(registrationsAthleteRepo.loadByRegistrations).toHaveBeenCalledWith('20')
    expect(registrationsAthleteRepo.loadByRegistrations).toHaveBeenCalledWith('21')
  })

  test('Should throw accountRepo.loadById throw', async () => {
    jest.spyOn(registrationsRepo, 'loadByCategory').mockResolvedValueOnce(loadRegistrationsByCategoryMock)
    jest.spyOn(registrationsAthleteRepo, 'loadByRegistrations').mockResolvedValueOnce(loadRegistrationAthleteByRegistrationModelMock)
    jest.spyOn(accountRepo, 'loadById').mockImplementation(() => { throw new Error() })
    const useCase = new LoadRegistrationByCategoryIdUseCase(registrationsRepo, registrationsAthleteRepo, accountRepo)
    const promise = useCase.loadByCategoryId({ categoryId: '1', accountId: '1' })
    await expect(promise).rejects.toThrow()
    expect(registrationsRepo.loadByCategory).toHaveBeenCalledTimes(1)
    expect(registrationsAthleteRepo.loadByRegistrations).toHaveBeenCalledTimes(2)
  })
})

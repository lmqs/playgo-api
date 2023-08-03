import { IAccountRepository } from '@/data/protocols/db'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { LoadRegistrationByCategoryIdUseCase } from '@/data/usescases/registrations/db-load-by-category-id'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import { accountAthlete1, accountAthlete2, loadByCategoryResultMock, loadRegistrationsAthleteByCategoryMock } from './db-load-by-category-mock'

describe('DbAddCategory UseCase', () => {
  let accountRepo: IAccountRepository
  let registrationsAthleteRepo: IRegistrationsAthleteRepository

  beforeEach(async () => {
    accountRepo = new AccountPostgresRepository()
    registrationsAthleteRepo = new RegistrationsAthletePostgresRepository()
  })

  test('Should throw registrationsAthleteRepo.loadByCategory throw', async () => {
    jest.spyOn(registrationsAthleteRepo, 'loadByCategory').mockImplementation(() => {
      throw new Error()
    })
    const useCase = new LoadRegistrationByCategoryIdUseCase(registrationsAthleteRepo, accountRepo)
    const promise = useCase.loadByCategoryId({ categoryId: '1', accountId: '1' })
    await expect(promise).rejects.toThrow()
    expect(registrationsAthleteRepo.loadByCategory).toHaveBeenCalledWith('1')
  })

  test('Should throw accountRepo.loadById throw', async () => {
    jest.spyOn(registrationsAthleteRepo, 'loadByCategory').mockResolvedValueOnce(loadRegistrationsAthleteByCategoryMock)
    jest.spyOn(accountRepo, 'loadById').mockImplementation(() => { throw new Error() })
    const useCase = new LoadRegistrationByCategoryIdUseCase(registrationsAthleteRepo, accountRepo)
    const promise = useCase.loadByCategoryId({ categoryId: '1', accountId: '1' })
    await expect(promise).rejects.toThrow()
    expect(registrationsAthleteRepo.loadByCategory).toHaveBeenCalledWith('1')
  })

  test('Should load registrations by category on success', async () => {
    jest.spyOn(registrationsAthleteRepo, 'loadByCategory').mockResolvedValueOnce(loadRegistrationsAthleteByCategoryMock)
    jest.spyOn(accountRepo, 'loadById').mockResolvedValueOnce(accountAthlete1)
    jest.spyOn(accountRepo, 'loadById').mockResolvedValueOnce(accountAthlete2)

    const useCase = new LoadRegistrationByCategoryIdUseCase(registrationsAthleteRepo, accountRepo)

    const result = await useCase.loadByCategoryId({ categoryId: '1', accountId: '1' })
    expect(result).toEqual(loadByCategoryResultMock)
    expect(registrationsAthleteRepo.loadByCategory).toHaveBeenCalledWith('1')
    expect(accountRepo.loadById).toHaveBeenCalledTimes(2)
  })
})

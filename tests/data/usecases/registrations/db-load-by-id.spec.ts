import { LoadRegistrationByIdUseCase } from '@/data/usescases/registrations/db-load-by-id-registration'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { registrationsMock } from './db-load-by-id-mock'

describe('LoadRegistrationByIdUseCase UseCase', () => {
  let registrationsRepo: IRegistrationsRepository

  beforeEach(async () => {
    registrationsRepo = new RegistrationsPostgresRepository()
  })

  test('Should throw registrationsRepo.loadById throw', async () => {
    jest.spyOn(registrationsRepo, 'loadById').mockImplementation(() => {
      throw new Error()
    })
    const useCase = new LoadRegistrationByIdUseCase(registrationsRepo)
    const promise = useCase.loadById('1')
    await expect(promise).rejects.toThrow()
    expect(registrationsRepo.loadById).toHaveBeenCalledWith('1')
  })

  test('Should load registration by id on success', async () => {
    jest.spyOn(registrationsRepo, 'loadById').mockResolvedValueOnce(registrationsMock)
    const useCase = new LoadRegistrationByIdUseCase(registrationsRepo)

    const result = await useCase.loadById('1')
    expect(result).toEqual(registrationsMock)
    expect(registrationsRepo.loadById).toHaveBeenCalledWith('1')
  })

  test('Should return undefined when registration by id is empty', async () => {
    jest.spyOn(registrationsRepo, 'loadById').mockResolvedValueOnce(undefined)
    const useCase = new LoadRegistrationByIdUseCase(registrationsRepo)

    const result = await useCase.loadById('1')
    expect(result).toBeUndefined()
    expect(registrationsRepo.loadById).toHaveBeenCalledWith('1')
  })
})

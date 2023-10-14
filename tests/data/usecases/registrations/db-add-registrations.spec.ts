import { IAccountRepository, ICategoryRepository } from '@/data/protocols/db'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { AddRegistrationsUseCase } from '@/data/usescases/registrations/db-add-registrations'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { RegistrationsPostgresRepository } from '@/infra/database/postgres/registrations/registrations-repository'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import {
  accountModelMock, accountRegistrationModelMock, categoryActivatedMock, categoryActivatedOneAthleteMock, categoryNotActivatedMock,
  registrationModelMock, registrationWithAthlete, registrations2AthleteModelMock, registrationsAddOneAthleteParamsMock,
  registrationsAddParamsInvalidAthletesMock, registrationsAddParamsMock, registrationsAthleteModelMock,
  registrationsAthleteWaiting2ModelMock, registrationsAthleteWaitingModelMock, registrationsInvalidArrayMock,
  registrationsValidArrayMock, registrationsWaitingModelMock, tournamentDateInvalidMock, tournamentNotActivatedMock, tournamentValidMock
} from './db-add-registrations-mock'
import { RegistrationsWaitingPostgresRepository } from '@/infra/database/postgres/registrations/registrations-waiting-repository'
import { RegistrationsAthleteWaitingPostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-waiting-repository'
import { IRegistrationsAthleteWaitingRepository } from '@/data/protocols/db/registrations-athlete-waiting-repository'
import { IRegistrationsWaitingRepository } from '@/data/protocols/db/registrations-waiting-repository'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
jest.useFakeTimers().setSystemTime(new Date('2023-06-30 00:00:00'))

describe('DbAddCategory UseCase', () => {
  let categoryRepo: ICategoryRepository
  let tournamentRepo: ITournamentRepository
  let accountRepo: IAccountRepository
  let registrationsRepo: IRegistrationsRepository
  let registrationsAthleteRepo: IRegistrationsAthleteRepository
  let registrationsWaitingRepo: IRegistrationsWaitingRepository
  let registrationsAthleteWaitingRepo: IRegistrationsAthleteWaitingRepository

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
    tournamentRepo = new TournamentPostgresRepository()
    accountRepo = new AccountPostgresRepository()
    registrationsRepo = new RegistrationsPostgresRepository()
    registrationsAthleteRepo = new RegistrationsAthletePostgresRepository()
    registrationsWaitingRepo = new RegistrationsWaitingPostgresRepository()
    registrationsAthleteWaitingRepo = new RegistrationsAthleteWaitingPostgresRepository()
  })

  test('Should throw Error(Categoria não existente) if category is not activated', async () => {
    const loadSpy = jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryNotActivatedMock))
    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow('Categoria não existente')
    expect(loadSpy).toHaveBeenCalledWith('15')
  })

  test('Should throw categoryRepository.loadById throw', async () => {
    const loadSpy = jest.spyOn(categoryRepo, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow()
    expect(loadSpy).toHaveBeenCalledWith('15')
  })

  test('Should throw Error(Torneio não existente) if tournament is not activated', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    const loadTournamentSpy = jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentNotActivatedMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow('Torneio não existente')
    expect(loadTournamentSpy).toHaveBeenCalledWith('10')
  })

  test('Should throw Error(Inscrições finalizadas) if registration final date is greater than today', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    const loadTournamentSpy = jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentDateInvalidMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow('Inscrições finalizadas')
    expect(loadTournamentSpy).toHaveBeenCalledWith('10')
  })

  test('Should throw tournamentRepository.loadById throw', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    const loadTournamentSpy = jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow()
    expect(loadTournamentSpy).toHaveBeenCalledWith('10')
  })

  test('Should throw Error if the number of athletes is greater than the category allows', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve(registrationsValidArrayMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsInvalidAthletesMock)
    await expect(promise).rejects.toThrow('Quantidade de atletas maior que o permitido para essa categoria.')
  })

  test('Should throw Error(Usuário inválido) if user is not exists in db', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve(registrationsValidArrayMock))
    const loadAccountByIdSpy = jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(undefined))
    const load2AccountByIdSpy = jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountModelMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow('Usuário inválido')
    expect(loadAccountByIdSpy).toHaveBeenCalledWith('3')
    expect(load2AccountByIdSpy).toHaveBeenCalledWith('4')
  })

  test('Should add in waiting list and throw Error(Vagas esgotadas) if the maximum number of vacancies has been filled', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountModelMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountRegistrationModelMock))
    const loadRegistrationsSpy = jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(
      Promise.resolve(registrationsInvalidArrayMock)
    )
    jest.spyOn(registrationsWaitingRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationsWaitingModelMock))

    jest.spyOn(registrationsAthleteWaitingRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationsAthleteWaitingModelMock))
    jest.spyOn(registrationsAthleteWaitingRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationsAthleteWaiting2ModelMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow('Vagas esgotadas, sua inscrição foi para a lista de espera.')
    expect(loadRegistrationsSpy).toHaveBeenCalledWith('15')
  })

  test('Should throw registrationsRepo.loadByCategory throw', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountModelMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountRegistrationModelMock))
    const loadRegistrationsSpy = jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.reject(new Error()))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow()
    expect(loadRegistrationsSpy).toHaveBeenCalledWith('15')
  })

  test('Should throw Error(Usuário já cadastrado nessa categoria) if user was registration this same category', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountModelMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountRegistrationModelMock))
    jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve(registrationsValidArrayMock))

    jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser')
      .mockReturnValueOnce(Promise.resolve(registrationWithAthlete))
      .mockReturnValueOnce(Promise.resolve([undefined]))

    const loadAccountByIdSpy = jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountRegistrationModelMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow('Usuário Ana já cadastrada(o) nessa categoria.')
    expect(registrationsAthleteRepo.loadByCategoryAndUser).toHaveBeenCalledWith({ categoryId: '15', athleteId: '3' })
    expect(registrationsAthleteRepo.loadByCategoryAndUser).toHaveBeenCalledWith({ categoryId: '15', athleteId: '4' })
    expect(loadAccountByIdSpy).toHaveBeenCalledWith('3')
  })

  test('Should remove registrations and athletes if trying to add throw Error', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve(registrationsValidArrayMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountModelMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountRegistrationModelMock))

    jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser').mockReturnValueOnce(Promise.resolve([]))
    jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser').mockReturnValueOnce(Promise.resolve([]))

    jest.spyOn(registrationsRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationModelMock))
    jest.spyOn(registrationsAthleteRepo, 'add').mockReturnValueOnce((Promise.reject(new Error())))

    const registrationsAthleteRepoSpy =
      jest.spyOn(registrationsAthleteRepo, 'removeByRegistration').mockReturnValueOnce(Promise.resolve())
    const registrationsRepoSpy = jest.spyOn(registrationsRepo, 'remove').mockReturnValueOnce(Promise.resolve())

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const promise = addRegistrationsUseCase.add(registrationsAddParamsMock)
    await expect(promise).rejects.toThrow()

    expect(registrationsAthleteRepoSpy).toHaveBeenCalledWith('10')
    expect(registrationsRepoSpy).toHaveBeenCalledWith('10')
  })

  test('Should add registrations and athletes in category on success', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve(registrationsValidArrayMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountModelMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountRegistrationModelMock))

    jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser').mockReturnValueOnce(Promise.resolve([]))
    jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser').mockReturnValueOnce(Promise.resolve([]))

    const registrationsAddRepoSpy = jest.spyOn(registrationsRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationModelMock))

    jest.spyOn(registrationsAthleteRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationsAthleteModelMock))
    jest.spyOn(registrationsAthleteRepo, 'add').mockReturnValueOnce(Promise.resolve(registrations2AthleteModelMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const result = await addRegistrationsUseCase.add(registrationsAddParamsMock)
    expect(registrationsAddRepoSpy).toHaveBeenCalledWith({ categoryId: '15', registrationDate: 'now()' })
    expect(result).toEqual([
      {
        id: '20',
        isPay: false,
        deleted: false,
        registrationsId: '10',
        athlete: { id: '3', name: 'Rick' }
      },
      {
        id: '21',
        isPay: false,
        deleted: false,
        registrationsId: '10',
        athlete: { id: '4', name: 'Ana' }
      }
    ])
  })

  test('Should successfully add the registration of only one athlete in the category', async () => {
    jest.spyOn(categoryRepo, 'loadById').mockReturnValue(Promise.resolve(categoryActivatedOneAthleteMock))
    jest.spyOn(tournamentRepo, 'loadById').mockReturnValueOnce(Promise.resolve(tournamentValidMock))
    jest.spyOn(registrationsRepo, 'loadByCategory').mockReturnValueOnce(Promise.resolve(registrationsValidArrayMock))
    jest.spyOn(accountRepo, 'loadById').mockReturnValueOnce(Promise.resolve(accountModelMock))

    jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser').mockReturnValueOnce(Promise.resolve([]))
    jest.spyOn(registrationsAthleteRepo, 'loadByCategoryAndUser').mockReturnValueOnce(Promise.resolve([]))

    jest.spyOn(registrationsRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationModelMock))
    jest.spyOn(registrationsAthleteRepo, 'add').mockReturnValueOnce(Promise.resolve(registrationsAthleteModelMock))

    const addRegistrationsUseCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepo, registrationsRepo, registrationsAthleteRepo,
      registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
    const result = await addRegistrationsUseCase.add(registrationsAddOneAthleteParamsMock)
    expect(registrationsRepo.add).toHaveBeenCalledWith({ categoryId: '33', registrationDate: 'now()' })
    expect(result).toEqual([
      {
        id: '20',
        isPay: false,
        deleted: false,
        registrationsId: '10',
        athlete: { id: '3', name: 'Rick' }
      }
    ])
  })
})

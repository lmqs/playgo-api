import { DbAddTournament } from '@/data/usescases/tournament/db-add-tournament'
import { errorsConstant } from '@/data/constants/errors'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { addTournamentObjectMock, loadByIdTournamentObjectMock } from './tournament-mock'
import { InvalidDateError } from '@/data/errors/invalid-date-error'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'

describe('DbAddTournament UseCase', () => {
  let tournamentRepositoryStub: ITournamentRepository
  beforeEach(() => {
    tournamentRepositoryStub = new TournamentPostgresRepository()
  })

  test('Should return tournament object', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(tournamentRepositoryStub, 'add').mockResolvedValueOnce(loadByIdTournamentObjectMock)

    const useCase = new DbAddTournament(tournamentRepositoryStub)

    await useCase.add(addTournamentObjectMock)
    expect(tournamentRepositoryStub.loadByDescription).toHaveBeenCalledWith('valid_description')
    expect(tournamentRepositoryStub.add).toHaveBeenCalledWith(addTournamentObjectMock)
  })

  test('Should throw if loadByDescription throws', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.reject(new Error()))
    const useCase = new DbAddTournament(tournamentRepositoryStub)

    const promise = useCase.add(addTournamentObjectMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return InvalidDateError if validRegistrationDate is invalid', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])

    const addTournamentRepositorySpy = jest.spyOn(tournamentRepositoryStub, 'add')
    const useCase = new DbAddTournament(tournamentRepositoryStub)

    const promise = useCase.add({
      ...addTournamentObjectMock,
      dtFinalRegistration: '01/06/2023',
      dtStartRegistration: '02/06/2023'
    })
    await expect(promise).rejects.toThrow(new InvalidDateError(errorsConstant.invalidRegistrationDate))

    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should return InvalidDateError if validTournamentDate is invalid', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    const addTournamentRepositorySpy = jest.spyOn(tournamentRepositoryStub, 'add')

    const useCase = new DbAddTournament(tournamentRepositoryStub)

    const promise = useCase.add({
      ...addTournamentObjectMock,
      dtFinalTournament: '01/06/2023',
      dtStartTournament: '02/06/2023'
    })

    await expect(promise).rejects.toThrow(new InvalidDateError(errorsConstant.invalidTournamentDate))
    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should return ParamInUseError if TournamentRepository.loadByDescription not return empty', async () => {
    const useCase = new DbAddTournament(tournamentRepositoryStub)
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([loadByIdTournamentObjectMock])
    const addTournamentRepositorySpy = jest.spyOn(tournamentRepositoryStub, 'add')

    const promise = useCase.add(addTournamentObjectMock)
    await expect(promise).rejects.toThrow(new ParamInUseError(errorsConstant.description))

    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should throw if add throws', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(tournamentRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const useCase = new DbAddTournament(tournamentRepositoryStub)

    const promise = useCase.add(addTournamentObjectMock)
    await expect(promise).rejects.toThrow()
  })
})

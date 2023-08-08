import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { DbUpdateTournament } from '@/data/usescases/tournament/db-update'
import { listTournamentUsedMock, updateMock, updateParamsInvalidDtRegistrationMock, updateParamsInvalidDtTournamentMock, updateRepoMock } from './db-update-tournament-mock'
import { errorsConstant } from '@/data/constants/errors'
import { InvalidDateError } from '@/data/errors/invalid-date-error'

describe('UpdateTournament UseCase', () => {
  let tournamentRepositoryStub: ITournamentRepository
  beforeEach(() => {
    tournamentRepositoryStub = new TournamentPostgresRepository()
  })

  test('Should return tournament object', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(tournamentRepositoryStub, 'updateTournament').mockResolvedValueOnce(updateRepoMock)

    const useCase = new DbUpdateTournament(tournamentRepositoryStub)

    await useCase.update(updateMock)
    expect(tournamentRepositoryStub.loadByDescription).toHaveBeenCalledWith('valid_description')
    expect(tournamentRepositoryStub.updateTournament).toHaveBeenCalledWith(updateMock)
    expect(tournamentRepositoryStub.loadByDescription).toHaveBeenCalledWith(updateMock.description)
  })

  test('Should throw if loadByDescription throws', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockImplementation(() => {
      throw new Error()
    })
    const useCase = new DbUpdateTournament(tournamentRepositoryStub)
    const promise = useCase.update(updateMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return ParamInUseError if TournamentRepository.loadByDescription not return empty', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce(listTournamentUsedMock)
    jest.spyOn(tournamentRepositoryStub, 'updateTournament')

    const useCase = new DbUpdateTournament(tournamentRepositoryStub)

    const promise = useCase.update(updateMock)
    await expect(promise).rejects.toThrow(new ParamInUseError(errorsConstant.description))

    expect(tournamentRepositoryStub.updateTournament).toHaveBeenCalledTimes(0)
    expect(tournamentRepositoryStub.loadByDescription).toHaveBeenCalledWith(updateMock.description)
  })

  test('Should return InvalidDateError if dtRegistration is invalid', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(tournamentRepositoryStub, 'updateTournament')

    const useCase = new DbUpdateTournament(tournamentRepositoryStub)

    const promise = useCase.update(updateParamsInvalidDtRegistrationMock)
    await expect(promise).rejects.toThrow(new InvalidDateError(errorsConstant.invalidRegistrationDate))

    expect(tournamentRepositoryStub.updateTournament).toHaveBeenCalledTimes(0)
    expect(tournamentRepositoryStub.loadByDescription).toHaveBeenCalledWith(updateParamsInvalidDtRegistrationMock.description)
  })

  test('Should return InvalidDateError if dtTournament is invalid', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(tournamentRepositoryStub, 'updateTournament')

    const useCase = new DbUpdateTournament(tournamentRepositoryStub)

    const promise = useCase.update(updateParamsInvalidDtTournamentMock)
    await expect(promise).rejects.toThrow(new InvalidDateError(errorsConstant.invalidTournamentDate))

    expect(tournamentRepositoryStub.updateTournament).toHaveBeenCalledTimes(0)
    expect(tournamentRepositoryStub.loadByDescription).toHaveBeenCalledWith(updateParamsInvalidDtTournamentMock.description)
  })

  test('Should throw if update throws', async () => {
    jest.spyOn(tournamentRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(tournamentRepositoryStub, 'updateTournament').mockImplementation(() => {
      throw new Error('fake error')
    })

    const useCase = new DbUpdateTournament(tournamentRepositoryStub)

    const promise = useCase.update(updateMock)
    await expect(promise).rejects.toThrow()
  })
})

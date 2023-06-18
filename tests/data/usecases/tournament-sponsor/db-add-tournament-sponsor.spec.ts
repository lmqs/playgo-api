import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { addParamsTournamentSponsorModelMock, addResultTournamentSponsorModelMock } from './tournament-sponsor-mock'
import { AddTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor'

describe('AddTournamentSponsor UseCase', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
  })

  test('Should call tournamentSponsorRepository.add with correct values', async () => {
    const addSpy = jest.spyOn(tournamentSponsorRepo, 'add').mockResolvedValueOnce(addResultTournamentSponsorModelMock)

    const addTournamentSponsorUseCase = new AddTournamentSponsorUseCase(tournamentSponsorRepo)
    await addTournamentSponsorUseCase.add(addParamsTournamentSponsorModelMock)
    expect(addSpy).toHaveBeenCalledWith({ tournamentId: 'valid_tournament', name: 'valid_name' })
  })

  test('Should throw if tournamentSponsorRepository.add throws', async () => {
    const addTournamentSponsorUseCase = new AddTournamentSponsorUseCase(tournamentSponsorRepo)
    jest.spyOn(tournamentSponsorRepo, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = addTournamentSponsorUseCase.add(addParamsTournamentSponsorModelMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a tournamentSponsor on success', async () => {
    jest.spyOn(tournamentSponsorRepo, 'add').mockResolvedValueOnce(addResultTournamentSponsorModelMock)

    const addTournamentSponsorUseCase = new AddTournamentSponsorUseCase(tournamentSponsorRepo)
    const result = await addTournamentSponsorUseCase.add(addParamsTournamentSponsorModelMock)

    expect(result).toEqual({
      id: '1',
      name: 'valid_name',
      photo: undefined,
      tournamentId: 'valid_tournament',
      otherInformation: undefined,
      deleted: true
    })
  })
})

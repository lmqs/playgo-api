import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { UpdateTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor'
import { updateParamsModelMock, updateResultModelMock } from './tournament-sponsor-mock'

describe('AddTournamentSponsor UseCase', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
  })

  test('Should throw if tournamentSponsorRepository.updateSponsor throws', async () => {
    jest.spyOn(tournamentSponsorRepo, 'updateSponsor').mockImplementation(() => {
      throw new Error()
    })
    const useCase = new UpdateTournamentSponsorUseCase(tournamentSponsorRepo)

    const promise = useCase.update(updateResultModelMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a tournamentSponsor on success', async () => {
    jest.spyOn(tournamentSponsorRepo, 'updateSponsor').mockResolvedValueOnce(updateResultModelMock)

    const useCase = new UpdateTournamentSponsorUseCase(tournamentSponsorRepo)
    const result = await useCase.update(updateParamsModelMock)

    expect(result).toEqual(updateResultModelMock)
    expect(tournamentSponsorRepo.updateSponsor).toHaveBeenCalledWith(updateParamsModelMock)
  })
})

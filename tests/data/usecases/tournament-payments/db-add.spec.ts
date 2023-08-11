import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { DbAddTournamentPayments } from '@/data/usescases/tournament-payments/add'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { addParamsMock, addResultMock, loadByTournamentInvalidMock, loadByTournamentValidMock } from './tournament-payments-mock'

describe('AddTournamentSponsor UseCase', () => {
  let repo: ITournamentPaymentsRepository

  beforeEach(async () => {
    repo = new TournamentPaymentsPostgresRepository()
  })
  test('Should throw an error if indexPayment has already been used on another record', async () => {
    jest.spyOn(repo, 'loadByTournament').mockResolvedValueOnce(loadByTournamentInvalidMock)
    jest.spyOn(repo, 'add')

    const useCase = new DbAddTournamentPayments(repo)
    const promise = useCase.add(addParamsMock)
    await expect(promise).rejects.toThrow('Erro ao tentar salvar registro, esse índice de pagamento já está em uso')
    expect(repo.add).toHaveBeenCalledTimes(0)
  })

  test('Should throw if tournamentSponsorRepository.add throws', async () => {
    jest.spyOn(repo, 'loadByTournament').mockResolvedValueOnce(loadByTournamentValidMock)
    jest.spyOn(repo, 'add').mockImplementation(() => {
      throw new Error()
    })
    const useCase = new DbAddTournamentPayments(repo)

    const promise = useCase.add(addParamsMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a tournament-payments on success', async () => {
    jest.spyOn(repo, 'loadByTournament').mockResolvedValueOnce(loadByTournamentValidMock)
    jest.spyOn(repo, 'add').mockResolvedValueOnce(addResultMock)

    const useCase = new DbAddTournamentPayments(repo)
    const result = await useCase.add(addParamsMock)

    expect(result).toEqual(addResultMock)
    expect(repo.add).toHaveBeenCalledWith(addParamsMock)
  })
})

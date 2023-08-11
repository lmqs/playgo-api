import { loadAllMock } from './tournament-payments-mock'
import { DbLoadAllTournamentPayments } from '@/data/usescases/tournament-payments/load-all'
import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'

describe('DbLoadAllTournamentPayments UseCase', () => {
  let repo: ITournamentPaymentsRepository

  beforeEach(async () => {
    repo = new TournamentPaymentsPostgresRepository()
  })

  test('Should returns empty array if is not exists in database', async () => {
    jest.spyOn(repo, 'load').mockResolvedValueOnce([])

    const useCase = new DbLoadAllTournamentPayments(repo)
    const result = await useCase.loadAll()
    expect(result.length).toBe(0)
    expect(repo.load).toHaveBeenCalledTimes(1)
  })

  test('Should throw if tournamentPaymentsRepository.loadAll throws', async () => {
    const useCase = new DbLoadAllTournamentPayments(repo)
    jest.spyOn(repo, 'load').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = useCase.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('Should returns a tournamentPaymentsRepository array if success', async () => {
    jest.spyOn(repo, 'load').mockResolvedValueOnce(loadAllMock)
    const useCase = new DbLoadAllTournamentPayments(repo)
    await useCase.loadAll()
  })
})

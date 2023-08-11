import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { ILoadAllTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'

export class DbLoadAllTournamentPayments implements ILoadAllTournamentPaymentsUseCase {
  constructor (
    private readonly tournamentPaymentsRepository: ITournamentPaymentsRepository
  ) {}

  async loadAll (): Promise<ILoadAllTournamentPaymentsUseCase.Result> {
    return await this.tournamentPaymentsRepository.load()
  }
}

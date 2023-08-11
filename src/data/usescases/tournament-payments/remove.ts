import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { IRemoveTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'

export class DbRemoveTournamentPayments implements IRemoveTournamentPaymentsUseCase {
  constructor (
    private readonly tournamentPaymentsRepository: ITournamentPaymentsRepository
  ) {}

  async remove (id: string): Promise<IRemoveTournamentPaymentsUseCase.Result> {
    return await this.tournamentPaymentsRepository.remove(id)
  }
}

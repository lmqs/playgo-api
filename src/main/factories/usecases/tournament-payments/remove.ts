import { IRemoveTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { DbRemoveTournamentPayments } from '@/data/usescases/tournament-payments/remove'

export const makeRemoveTournamentPaymentsUseCase = (): IRemoveTournamentPaymentsUseCase => {
  const repository = new TournamentPaymentsPostgresRepository()
  return new DbRemoveTournamentPayments(repository)
}

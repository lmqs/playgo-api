import { ILoadAllTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { DbLoadAllTournamentPayments } from '@/data/usescases/tournament-payments/load-all'

export const makeLoadAllTournamentPaymentsUseCase = (): ILoadAllTournamentPaymentsUseCase => {
  const repository = new TournamentPaymentsPostgresRepository()
  return new DbLoadAllTournamentPayments(repository)
}

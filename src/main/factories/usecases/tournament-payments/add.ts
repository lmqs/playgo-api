import { IAddTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { DbAddTournamentPayments } from '@/data/usescases/tournament-payments/add'

export const makeAddTournamentPaymentsUseCase = (): IAddTournamentPaymentsUseCase => {
  const repository = new TournamentPaymentsPostgresRepository()
  return new DbAddTournamentPayments(repository)
}

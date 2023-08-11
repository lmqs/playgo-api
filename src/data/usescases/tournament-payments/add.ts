import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { IAddTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments/add'

export class DbAddTournamentPayments implements IAddTournamentPaymentsUseCase {
  constructor (
    private readonly tournamentPaymentsRepository: ITournamentPaymentsRepository
  ) {}

  async add (data: IAddTournamentPaymentsUseCase.Params): Promise<IAddTournamentPaymentsUseCase.Result> {
    const paymentsToTournament = await this.tournamentPaymentsRepository.loadByTournament(data.tournamentId)
    const result = paymentsToTournament.filter((payment) => {
      return payment.indexPayment === data.indexPayment
    })
    if (result.length) {
      throw new Error('Erro ao tentar salvar registro, esse índice de pagamento já está em uso')
    }
    return await this.tournamentPaymentsRepository.add(data)
  }
}

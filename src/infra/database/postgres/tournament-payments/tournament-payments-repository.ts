import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { InputDBTournamentPayments, OutputDBTournamentPayments, mapCollectionDbToData, mapDataToDbAdd, mapDbToData } from '@/infra/model/tournament-payments'
import { BaseRepository } from '@/infra/service/base-repository-service'

export class TournamentPaymentsPostgresRepository
  extends BaseRepository<InputDBTournamentPayments, OutputDBTournamentPayments> implements ITournamentPaymentsRepository {
  constructor (public readonly tableName: string = 'tournament_payments') {
    super(tableName)
  }

  async add (data: ITournamentPaymentsRepository.AddParams): Promise<ITournamentPaymentsRepository.Result> {
    const result = await this.create(mapDataToDbAdd(data))
    return mapDbToData(result)
  }

  async load (): Promise<ITournamentPaymentsRepository.Results> {
    const result = await this.findAll()
    return mapCollectionDbToData(result)
  }

  async loadById (id: string): Promise<ITournamentPaymentsRepository.Result> {
    const result = await this.findOne('id', id)
    return mapDbToData(result)
  }

  async loadByTournament (tournamentId: string): Promise<ITournamentPaymentsRepository.Results> {
    const result = await this.findWhereGeneric(`tournament_id =  ${tournamentId}`, 'index_payment asc')
    return mapCollectionDbToData(result)
  }

  async remove (id: string): Promise<boolean> {
    await this.delete(id)
    return true
  }
}

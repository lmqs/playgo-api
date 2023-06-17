
import { BaseRepository } from '@/infra/database/postgres/base-repository'
import { dataModelToDbModelMapTournamentSponsor, ITournamentSponsorRepository } from '@/data/protocols/db'
import { dbModelToDataModelMapTournamentSponsor, InputDbTournamentSponsorModel, OutputDbTournamentSponsorModel } from '@/data/models/db-tournament-sponsor'

export class TournamentSponsorPostgresRepository
  extends BaseRepository<InputDbTournamentSponsorModel, OutputDbTournamentSponsorModel> implements ITournamentSponsorRepository {
  constructor (public readonly tableName: string = 'tournament_sponsor') {
    super(tableName)
  }

  async add (data: ITournamentSponsorRepository.AddParams): Promise<ITournamentSponsorRepository.Result> {
    const result = await this.create(dataModelToDbModelMapTournamentSponsor(data))
    return dbModelToDataModelMapTournamentSponsor(result)
  }
}

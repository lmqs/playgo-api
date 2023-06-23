
import { BaseRepository } from '@/infra/service/base-repository-service'
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

  async loadByTournamentId (id: string): Promise<ITournamentSponsorRepository.LoadResult> {
    const tournamentsSponsor = await this.findGeneric({ tournament_id: id })
    return tournamentsSponsor.map((ts) => {
      return dbModelToDataModelMapTournamentSponsor(ts)
    })
  }

  async loadById (id: string): Promise<ITournamentSponsorRepository.Result | undefined> {
    const tournamentSponsor = await this.findGeneric({ id })
    return dbModelToDataModelMapTournamentSponsor(tournamentSponsor[0])
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }
}

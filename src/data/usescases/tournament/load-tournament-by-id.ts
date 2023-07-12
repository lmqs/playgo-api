import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { FormatDate } from '@/infra/gateways/date/date-handler'

export class DbLoadTournamentById implements LoadTournamentById {
  constructor (
    private readonly tournamentRepository: TournamentPostgresRepository,
    private readonly dateHelper: FormatDate

  ) {}

  async load (id: string): Promise<LoadTournamentById.Result | undefined> {
    const tournament = await this.tournamentRepository.loadById(id)
    if (tournament) {
      const tournamentModel = {
        ...tournament,
        dtFinalRegistrationFormatted:
          this.dateHelper.fullDate({ startDateString: tournament.dtFinalRegistration }) || tournament.dtFinalRegistration,
        dtStartRegistrationFormatted:
          this.dateHelper.fullDate({ startDateString: tournament.dtStartRegistration }) || tournament.dtStartRegistration,
        dtFinalTournamentFormatted:
          this.dateHelper.fullDate({ startDateString: tournament.dtFinalTournament }) || tournament.dtFinalTournament,
        dtStartTournamentFormatted:
        this.dateHelper.fullDate({ startDateString: tournament.dtStartTournament }) || tournament.dtStartTournament
      }
      return tournamentModel
    }
  }
}

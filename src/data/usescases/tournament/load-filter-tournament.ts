import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { ILoadTournamentByFilter } from '@/domain/usecases/tournament/load-tournament-by-filter'
import { IFormatDate } from '@/helpers/date-handler'

export class DbLoadFilterTournaments implements ILoadTournamentByFilter {
  constructor (
    private readonly tournamentRepository: ITournamentRepository,
    private readonly dateHandler: IFormatDate
  ) {}

  async loadDateFilter (): Promise<ILoadTournamentByFilter.Result | undefined> {
    const dateToday = this.dateHandler.formatDateToString({ input: new Date(), format: 'YYYY-MM-DD' })
    const [finishedTournaments, openedTournaments] = await Promise.all([
      await this.tournamentRepository.loadFilter({ date: `'${dateToday}'`, operator: '<=' }),
      await this.tournamentRepository.loadFilter({ date: ` '${dateToday}'`, operator: '>' })
    ])

    return {
      opened: openedTournaments,
      finished: finishedTournaments
    }
  }
}

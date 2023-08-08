import moment from 'moment'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { InvalidDateError } from '@/data/errors/invalid-date-error'
import { errorsConstant } from '@/data/constants/errors'
import { IUpdateTournament } from '@/domain/usecases/tournament/update-tournament'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'

export class DbUpdateTournament implements IUpdateTournament {
  constructor (
    private readonly tournamentRepository: ITournamentRepository,
    private readonly descriptionError = errorsConstant.description,
    private readonly invalidRegistrationDateError = errorsConstant.invalidRegistrationDate,
    private readonly invalidTournamentDateError = errorsConstant.invalidTournamentDate
  ) {}

  async update (data: IUpdateTournament.Params): Promise<IUpdateTournament.Result> {
    const tournamentsUsed = await this.tournamentRepository.loadByDescription(data.description)
    if (tournamentsUsed.length && data.id.toString() !== tournamentsUsed[0].id.toString()) throw new ParamInUseError(this.descriptionError)

    const isValidRegistrationDate = data.dtStartRegistration && data.dtFinalRegistration &&
      moment(data.dtStartRegistration.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalRegistration.toString(), 'DD/MM/YYYY')
    if (!isValidRegistrationDate) throw new InvalidDateError(this.invalidRegistrationDateError)

    const isValidTournamentDate = data.dtStartTournament && data.dtFinalTournament &&
      moment(data.dtStartTournament.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalTournament.toString(), 'DD/MM/YYYY')
    if (!isValidTournamentDate) throw new InvalidDateError(this.invalidTournamentDateError)

    return await this.tournamentRepository.updateTournament(data)
  }
}

import moment from 'moment'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { InvalidDateError } from '@/data/errors/invalid-date-error'
import { errorsConstant } from '@/data/constants/errors'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'

export class DbAddTournament implements AddTournament {
  private readonly descriptionError = errorsConstant.description
  private readonly invalidRegistrationDateError = errorsConstant.invalidRegistrationDate
  private readonly invalidTournamentDateError = errorsConstant.invalidTournamentDate

  constructor (
    private readonly tournamentRepository: ITournamentRepository
  ) {}

  async add (data: AddTournament.Params): Promise<AddTournament.Result | undefined> {
    const isDescriptionUsed = await this.tournamentRepository.loadByDescription(data.description)
    if (isDescriptionUsed.length) throw new ParamInUseError(this.descriptionError)

    const isValidRegistrationDate =
      moment(data.dtStartRegistration.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalRegistration.toString(), 'DD/MM/YYYY')
    if (!isValidRegistrationDate) throw new InvalidDateError(this.invalidRegistrationDateError)

    const isValidTournamentDate =
      moment(data.dtStartTournament.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalTournament.toString(), 'DD/MM/YYYY')

    if (!isValidTournamentDate) throw new InvalidDateError(this.invalidTournamentDateError)

    return await this.tournamentRepository.add(data)
  }
}

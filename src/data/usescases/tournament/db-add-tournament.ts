import moment from 'moment'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { AddTournamentRepository, LoadTournamentByDescriptionRepository } from '@/data/protocols/db/tournament'
import { InvalidDateError } from '@/data/errors/invalid-date-error'
import { errorsConstant } from '@/data/constants/errors'

export class DbAddTournament implements AddTournament {
  constructor (
    private readonly loadTournamentByDescriptionRepository: LoadTournamentByDescriptionRepository,
    private readonly addTournamentRepository: AddTournamentRepository,
    private readonly descriptionError = errorsConstant.description,
    private readonly invalidRegistrationDateError = errorsConstant.invalidRegistrationDate,
    private readonly invalidTournamentDateError = errorsConstant.invalidTournamentDate
  ) {}

  async add (data: AddTournament.Params): Promise<AddTournament.Result | undefined> {
    const isDescriptionUsed = await this.loadTournamentByDescriptionRepository.loadByDescription(data.description)
    if (isDescriptionUsed) throw new ParamInUseError(this.descriptionError)

    const isValidRegistrationDate = moment(data.dtStartRegistration.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalRegistration.toString(), 'DD/MM/YYYY')
    if (!isValidRegistrationDate) throw new InvalidDateError(this.invalidRegistrationDateError)

    const isValidTournamentDate = moment(data.dtStartTournament.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalTournament.toString(), 'DD/MM/YYYY')
    if (!isValidTournamentDate) throw new InvalidDateError(this.invalidTournamentDateError)

    return await this.addTournamentRepository.add(data)
  }
}

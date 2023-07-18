import moment from 'moment'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { LoadTournamentByDescriptionRepository, UpdateTournamentRepository } from '@/data/protocols/db/tournament'
import { InvalidDateError } from '@/data/errors/invalid-date-error'
import { errorsConstant } from '@/data/constants/errors'
import { IUpdateTournament } from '@/domain/usecases/tournament/update-tournament'

export class DbUpdateTournament implements IUpdateTournament {
  constructor (
    private readonly loadTournamentByDescriptionRepository: LoadTournamentByDescriptionRepository,
    private readonly updateTournamentRepository: UpdateTournamentRepository,
    private readonly descriptionError = errorsConstant.description,
    private readonly invalidRegistrationDateError = errorsConstant.invalidRegistrationDate,
    private readonly invalidTournamentDateError = errorsConstant.invalidTournamentDate
  ) {}

  async update (data: IUpdateTournament.Params): Promise<IUpdateTournament.Result | undefined> {
    const isDescriptionUsed = await this.loadTournamentByDescriptionRepository.loadByDescription(data.description)
    if (isDescriptionUsed && data.id.toString() !== isDescriptionUsed.id.toString()) throw new ParamInUseError(this.descriptionError)

    const isValidRegistrationDate = data.dtStartRegistration && data.dtFinalRegistration &&
      moment(data.dtStartRegistration.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalRegistration.toString(), 'DD/MM/YYYY')
    if (!isValidRegistrationDate) throw new InvalidDateError(this.invalidRegistrationDateError)

    const isValidTournamentDate = data.dtStartTournament && data.dtFinalTournament &&
      moment(data.dtStartTournament.toString(), 'DD/MM/YYYY') <= moment(data.dtFinalTournament.toString(), 'DD/MM/YYYY')
    if (!isValidTournamentDate) throw new InvalidDateError(this.invalidTournamentDateError)

    return await this.updateTournamentRepository.updateTournament(data)
  }
}

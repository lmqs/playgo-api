import { ILoadByIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { ParamNotfound } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class TournamentSponsorDatabaseValidation implements Validation {
  constructor (
    private readonly tournamentSponsorUseCase: ILoadByIdTournamentSponsor,
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.tournamentSponsorUseCase.loadById(input[this.fieldName])
    if (!isValid) {
      return new ParamNotfound(this.fieldName)
    }
  }
}

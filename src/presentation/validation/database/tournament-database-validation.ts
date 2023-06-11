import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'
import { ParamNotfound } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class TournamentDatabaseValidation implements Validation {
  constructor (
    private readonly loadTournamentById: LoadTournamentById,
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.loadTournamentById.load(input[this.fieldName])
    if (!isValid) {
      return new ParamNotfound(this.fieldName)
    }
  }
}

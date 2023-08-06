import { LoadSportById } from '@/domain/usecases/sport'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class SportDatabaseValidation implements Validation {
  constructor (
    private readonly loadSportByIdRepository: LoadSportById,
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.loadSportByIdRepository.loadById(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}

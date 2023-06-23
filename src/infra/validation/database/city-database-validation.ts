import { ILoadCityById } from '@/domain/usecases/city/load-city-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class CityDatabaseValidation implements Validation {
  constructor (
    private readonly loadCityById: ILoadCityById,
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.loadCityById.load(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}

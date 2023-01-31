import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  async validate (input: any): Promise<Error | undefined> {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}

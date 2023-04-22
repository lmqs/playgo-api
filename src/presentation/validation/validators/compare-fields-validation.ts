import { InvalidParamError } from '../../errors'
import { Validation } from '../../protocols'

export class CompareFieldsValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  async validate (input: any): Promise<Error | undefined> {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}

import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  async validate (input: any): Promise<Error | undefined> {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}

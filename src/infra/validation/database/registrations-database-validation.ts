import { ILoadRegistrationById } from '@/domain/usecases/registration/load-registration-by-id'
import { ParamNotfound } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RegistrationDatabaseValidation implements Validation {
  constructor (
    private readonly registrationUseCase: ILoadRegistrationById,
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.registrationUseCase.loadById(input[this.fieldName])
    if (!isValid) {
      return new ParamNotfound(this.fieldName)
    }
  }
}

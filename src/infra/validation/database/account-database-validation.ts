import { ILoadAccountById } from '@/domain/usecases/account/load-account-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class AccountDatabaseValidation implements Validation {
  constructor (
    private readonly loadAccountRepo: ILoadAccountById,
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.loadAccountRepo.loadById(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
  }
}

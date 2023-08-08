import { ILoadCategoryById } from '@/domain/usecases/category/load-category-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class CategoryDatabaseValidation implements Validation {
  constructor (
    private readonly loadById: ILoadCategoryById,
    private readonly fieldName: string
  ) {}

  async validate (input: any): Promise<Error | undefined> {
    const isValid = await this.loadById.loadById(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
  }
}

import { CONSTANTS } from '@/helpers/enumHelper'
import { ICategoryRepository } from '@/data/protocols/db'
import { IAddCategory } from '@/domain/usecases/category/add-category'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'

export class AddCategoryUseCase implements IAddCategory {
  constructor (
    private readonly loadCategoryByDescriptionAndIdRepository: ICategoryRepository,
    private readonly addCategoryRepository: ICategoryRepository
  ) {}

  async add (categoryData: IAddCategory.Params): Promise<IAddCategory.Result> {
    const isDescriptionValid = await this.loadCategoryByDescriptionAndIdRepository.loadByDescriptionAndId(
      categoryData.description, categoryData.tournamentId
    )
    if (isDescriptionValid?.length) {
      throw new ParamInUseError('description')
    }
    categoryData.numberAthletes = categoryData.numberAthletes ?? CONSTANTS.category.numberAthletesDefault
    const category = await this.addCategoryRepository.add(categoryData)
    return category
  }
}

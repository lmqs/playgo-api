import { ICategoryRepository } from '@/data/protocols/db'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { IUpdateCategory } from '@/domain/usecases/category/update-category'

export class UpdateCategoryUseCase implements IUpdateCategory {
  constructor (
    private readonly categoryRepository: ICategoryRepository,
    private readonly updateCategoryRepository: ICategoryRepository
  ) {}

  async update (categoryData: IUpdateCategory.Params): Promise<IUpdateCategory.Result> {
    const categorySaved = await this.categoryRepository.loadByDescriptionAndId(categoryData.description, categoryData.tournamentId)

    const isSameRecord = categorySaved.length && parseInt(categorySaved[0].id) === parseInt(categoryData.id)
    const isDataDeleted = !isSameRecord && categorySaved[0]?.deleted
    const isDescriptionValid = !categorySaved.length || isSameRecord || isDataDeleted
    if (!isDescriptionValid) {
      throw new ParamInUseError('description')
    }
    return await this.updateCategoryRepository.updateData(categoryData)
  }
}

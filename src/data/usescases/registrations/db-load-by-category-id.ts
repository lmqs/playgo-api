/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAccountRepository } from '@/data/protocols/db'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '

export class LoadRegistrationByCategoryIdUseCase implements ILoadRegistrationByCategoryId {
  constructor (
    private readonly registrationsAthleteRepo: IRegistrationsAthleteRepository,
    private readonly accountRepo: IAccountRepository
  ) {}

  async loadByCategoryId (data: ILoadRegistrationByCategoryId.Params): Promise<ILoadRegistrationByCategoryId.Result[]> {
    const results = await this.registrationsAthleteRepo.loadByCategory(data.categoryId)

    return await Promise.all(results.map(async (registration) => {
      const athlete = await this.accountRepo.loadById(registration.athleteId)
      return {
        id: registration.id,
        registrationsId: registration.registrationsId,
        athleteId: {
          id: athlete!.id,
          name: athlete!.name,
          photo: athlete!.photo
        },
        isPay: registration.isPay,
        deleted: registration.deleted,
        canDeleted: data.accountId === athlete!.id
      }
    }))
  }
}

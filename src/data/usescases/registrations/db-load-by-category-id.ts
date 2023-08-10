/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAccountRepository, IRegistrationsRepository } from '@/data/protocols/db'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '

export class LoadRegistrationByCategoryIdUseCase implements ILoadRegistrationByCategoryId {
  constructor (
    private readonly registrationsRepo: IRegistrationsRepository,
    private readonly registrationsAthleteRepo: IRegistrationsAthleteRepository,
    private readonly accountRepo: IAccountRepository
  ) {}

  async loadByCategoryId (data: ILoadRegistrationByCategoryId.Params): Promise<ILoadRegistrationByCategoryId.Result> {
    const registrations = await this.registrationsRepo.loadByCategory(data.categoryId)
    const results = await Promise.all(registrations.map(async (registration) => {
      const registrationsAthletes = await this.registrationsAthleteRepo.loadByRegistrations(registration.id)
      const athletes = await Promise.all(registrationsAthletes.map(async (registrationAthlete) => {
        const athlete = await this.accountRepo.loadById(registrationAthlete.athleteId)
        if (!athlete) throw new Error('Erro ao carregar lista de atletas')
        return {
          id: athlete.id,
          name: athlete.name,
          photo: athlete.photo,
          canDeleted: athlete.id === data.accountId,
          isPay: registrationAthlete.isPay
        }
      }))
      return { id: registration.id, athletes }
    }))

    return results
  }
}

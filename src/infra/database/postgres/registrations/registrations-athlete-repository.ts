
import { InputDbRegistrationsAthlete, OutputDbRegistrationsAthlete, dbModelToDataModelMapRegistrationsAthlete } from '@/data/models/db-registrations-athlete'
import { IRegistrationsAthleteRepository, dataModelToDbModelMapRegistrationsAthlete } from '@/data/protocols/db/registrations-athlete-repository'
import { BaseRepository } from '@/infra/service/base-repository-service'

export class RegistrationsAthletePostgresRepository extends BaseRepository<InputDbRegistrationsAthlete, OutputDbRegistrationsAthlete>
  implements IRegistrationsAthleteRepository {
  constructor (public readonly tableName: string = 'registrations_athlete') {
    super(tableName)
  }

  async add (data: IRegistrationsAthleteRepository.AddParams): Promise<IRegistrationsAthleteRepository.Result> {
    const result = await this.create(dataModelToDbModelMapRegistrationsAthlete(data))
    return dbModelToDataModelMapRegistrationsAthlete(result)
  }

  async loadById (id: string): Promise<IRegistrationsAthleteRepository.Result | undefined> {
    const result = await this.findGeneric({ id, deleted: false })
    return dbModelToDataModelMapRegistrationsAthlete(result[0])
  }

  async loadByCategory (categoryId: string): Promise<IRegistrationsAthleteRepository.LoadCategoryResult[]> {
    const result = await this.findWithJoin('registrations', 'registrations_id', 'id',
      [
        { field: 'registrations.deleted', value: 'false' },
        { field: 'registrations_athlete.deleted', value: 'false' },
        { field: 'registrations.category_id', value: categoryId }
      ])

    return result.map((item) => {
      return dbModelToDataModelMapRegistrationsAthlete(item)
    })
  }

  async loadByRegistrations (registrationsId: string): Promise<IRegistrationsAthleteRepository.LoadResult> {
    const result = await this.findGeneric({ registrations_id: registrationsId, deleted: false })
    return result.map((model) => {
      return dbModelToDataModelMapRegistrationsAthlete(model)
    })
  }

  async loadByCategoryAndUser (data: IRegistrationsAthleteRepository.LoadByCategoryAndUserParams): Promise<any[]> {
    const result = await this.findWithJoin('registrations', 'registrations_id', 'id',
      [
        { field: 'registrations.deleted', value: 'false' },
        { field: 'registrations_athlete.deleted', value: 'false' },
        { field: 'registrations.category_id', value: data.categoryId },
        { field: 'registrations_athlete.athlete_id', value: data.athleteId }
      ])

    return result
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }

  async removeByRegistration (registrationId: string): Promise<void> {
    await this.deleteByField({ registrations_id: registrationId })
  }
}

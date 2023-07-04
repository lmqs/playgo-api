
import { InputDbRegistrationsAthleteWaiting, OutputDbRegistrationsAthleteWaiting, dbModelToDataModelMapRegistrationsAthleteWaiting } from '@/data/models/db-registrations-athlete-waiting'
import { IRegistrationsAthleteWaitingRepository, dataModelToDbModelMapRegistrationsAthleteWaiting } from '@/data/protocols/db/registrations-athlete-waiting-repository'
import { BaseRepository } from '@/infra/service/base-repository-service'

export class RegistrationsAthleteWaitingPostgresRepository
  extends BaseRepository<InputDbRegistrationsAthleteWaiting, OutputDbRegistrationsAthleteWaiting>
  implements IRegistrationsAthleteWaitingRepository {
  constructor (public readonly tableName: string = 'registrations_athlete_waiting') {
    super(tableName)
  }

  async add (data: IRegistrationsAthleteWaitingRepository.AddParams): Promise<IRegistrationsAthleteWaitingRepository.Result> {
    const result = await this.create(dataModelToDbModelMapRegistrationsAthleteWaiting(data))
    return dbModelToDataModelMapRegistrationsAthleteWaiting(result)
  }

  async loadById (id: string): Promise<IRegistrationsAthleteWaitingRepository.Result | undefined> {
    const result = await this.findGeneric({ id, deleted: false })
    return dbModelToDataModelMapRegistrationsAthleteWaiting(result[0])
  }

  async loadByRegistrationsWaiting (registrationsWaitingId: string): Promise<IRegistrationsAthleteWaitingRepository.LoadResult> {
    const result = await this.findGeneric({ registrations_waiting_id: registrationsWaitingId, deleted: false })
    return result.map((model) => {
      return dbModelToDataModelMapRegistrationsAthleteWaiting(model)
    })
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }
}

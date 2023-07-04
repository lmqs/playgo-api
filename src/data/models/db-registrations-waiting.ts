import { RegistrationsWaitingModel } from '@/domain/models/registrations-waiting'
import { DateHandler } from '@/infra/gateways/date/date-handler'

export type InputDbRegistrationsWaiting = {
  category_id: string
  deleted?: boolean
}

export type OutputDbRegistrationsWaiting = {
  id: string
  category_id: string
  date: Date
  deleted?: boolean
}

export const dbModelToDataModelMapRegistrationsWaiting =
(dbRegistrationsWaiting: OutputDbRegistrationsWaiting): RegistrationsWaitingModel => {
  const dateClass = new DateHandler()

  return (
    dbRegistrationsWaiting && {
      id: dbRegistrationsWaiting.id,
      categoryId: dbRegistrationsWaiting.category_id,
      deleted: dbRegistrationsWaiting.deleted,
      date: dateClass.formatDateToString(dbRegistrationsWaiting.date)
    }
  )
}

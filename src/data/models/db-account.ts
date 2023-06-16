import { AccountModel } from '@/domain/models/account'
import { DateHandler } from '@/infra/gateways/date/date-handler'

export type InputDbAccountModel = {
  name: string
  gender: string
  password: string
  email: string
  city_id: number
  phone_number: string
  date_birthday: Date
  photo?: string
  deleted?: boolean
  role?: string
  access_token?: string
}

export type OutputDbAccountModel = {
  id: string
  name: string
  gender: string
  password: string
  email: string
  city_id: number
  phone_number: string
  date_birthday: Date
  photo?: string
  deleted?: boolean
  role?: string
  access_token?: string
}

export const dbModelToDataModelMapCategory = (dbAccountModel: OutputDbAccountModel): AccountModel => {
  const dateClass = new DateHandler()

  return (
    dbAccountModel && {
      phoneNumber: dbAccountModel.phone_number,
      cityId: dbAccountModel.city_id,
      dateBirthday: dateClass.formatDateToString(dbAccountModel.date_birthday).toString(),
      accessToken: dbAccountModel.access_token,
      id: dbAccountModel.id,
      name: dbAccountModel.name,
      gender: dbAccountModel.gender,
      password: dbAccountModel.password,
      email: dbAccountModel.email,
      deleted: dbAccountModel.deleted,
      photo: dbAccountModel.photo,
      role: dbAccountModel.role
    }
  )
}

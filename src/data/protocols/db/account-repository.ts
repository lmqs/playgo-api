import { InputDbAccountModel } from '@/data/models/db-account'
import { AccountModel } from '@/domain/models/account'
import { DateHandler } from '@/infra/gateways/date/date-handler'

export interface IAccountRepository {
  add: (data: IAccountRepository.AddParams) => Promise<IAccountRepository.Result>
  loadById: (id: string) => Promise<AccountModel | undefined>
  loadByName: (name: string) => Promise<AccountModel[]>
  loadByEmail: (user: string) => Promise<AccountModel | undefined>
  loadByToken: (token: string, role?: string) => Promise<IAccountRepository.Result | undefined>
  updateAccessToken: (id: string, token: string) => Promise<void>
  updateData: (data: IAccountRepository.UpdateParams) => Promise<IAccountRepository.Result>
}

export namespace IAccountRepository {
  export type AddParams = {
    name: string
    gender: string
    password: string
    email: string
    cityId: number
    phoneNumber: string
    dateBirthday: string
    photo?: string
    deleted?: boolean
    role?: string
    accessToken?: string
  }
  export type UpdateParams = AccountModel
  export type Result = AccountModel
}

export const dataModelToDbModelMapCategory = (accountModel: IAccountRepository.AddParams): InputDbAccountModel => {
  const dateClass = new DateHandler()
  return {
    phone_number: accountModel.phoneNumber,
    city_id: accountModel.cityId,
    date_birthday: dateClass.format(accountModel.dateBirthday.toString()),
    name: accountModel.name,
    gender: accountModel.gender,
    password: accountModel.password,
    email: accountModel.email,
    photo: accountModel.photo,
    deleted: accountModel.deleted,
    role: accountModel.role,
    access_token: accountModel.accessToken
  }
}

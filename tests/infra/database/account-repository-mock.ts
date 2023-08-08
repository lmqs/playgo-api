import { OutputDbAccountModel } from '@/data/models/db-account'
import { IAccountRepository } from '@/data/protocols/db'
jest.useFakeTimers().setSystemTime(new Date('2023-06-13 17:40:00'))

export const addAccountParamsMock: IAccountRepository.AddParams = {
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '20/10/2020'
}

export const updateAccountParamsMock: IAccountRepository.UpdateParams = {
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '20/10/2020',
  deleted: false,
  role: 'admin'
}

export const dbAddAccountModelMock: OutputDbAccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  city_id: 1,
  phone_number: 'valid_number',
  photo: 'valid_photo',
  date_birthday: new Date('2023-06-13 17:40:00'),
  deleted: false,
  role: 'admin',
  access_token: undefined
}

export const dbAccountModelMock: OutputDbAccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  city_id: 1,
  phone_number: 'valid_number',
  photo: 'valid_photo',
  date_birthday: new Date('2023-06-13 17:40:00'),
  deleted: false,
  role: 'admin',
  access_token: 'any_token'
}

export const dbAccountModelWithoutRoleMock: OutputDbAccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  city_id: 1,
  phone_number: 'valid_number',
  photo: 'valid_photo',
  date_birthday: new Date('2023-06-13 17:40:00'),
  deleted: false,
  role: undefined,
  access_token: 'any_token'
}

export const dbArrayAccountModelMock: OutputDbAccountModel[] = [
  {
    id: '1',
    name: 'lucia',
    gender: 'valid_gender',
    password: 'valid_password',
    email: 'valid_email',
    city_id: 1,
    phone_number: 'valid_number',
    photo: 'valid_photo',
    date_birthday: new Date('2023-06-13 17:40:00'),
    deleted: false,
    role: undefined,
    access_token: 'any_token'
  },
  {
    id: '2',
    name: 'luciana',
    gender: 'valid_gender',
    password: 'valid_password',
    email: 'valid_email',
    city_id: 1,
    phone_number: 'valid_number',
    photo: 'valid_photo',
    date_birthday: new Date('2023-06-13 17:40:00'),
    deleted: false,
    role: undefined,
    access_token: 'any_token'
  }
]

export const dbArrayAccountReturnMock: IAccountRepository.Results = [
  {
    id: '1',
    name: 'lucia',
    gender: 'valid_gender',
    password: 'valid_password',
    email: 'valid_email',
    cityId: 1,
    phoneNumber: 'valid_number',
    photo: 'valid_photo',
    dateBirthday: '13/06/2023',
    deleted: false,
    role: undefined,
    accessToken: 'any_token'
  },
  {
    id: '2',
    name: 'luciana',
    gender: 'valid_gender',
    password: 'valid_password',
    email: 'valid_email',
    cityId: 1,
    phoneNumber: 'valid_number',
    photo: 'valid_photo',
    dateBirthday: '13/06/2023',
    deleted: false,
    role: undefined,
    accessToken: 'any_token'
  }
]

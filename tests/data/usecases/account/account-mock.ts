import { IAccountRepository } from '@/data/protocols/db'

export const dbAccountModelMock = {
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'hashed_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '20/10/2020',
  deleted: true
}

export const addAccountModelMock = {
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '20/10/2020'
}

export const addAuthenticationMock = {
  email: 'valid_email',
  password: 'valid_password',
  role: 'valid_role'
}

export const updateAccountModelMock = {
  id: '2',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '20/10/2020'
}

export const dbUpdateAccountModelMock = {
  id: '1',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'hashed_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '20/10/2020',
  deleted: true
}

export const accountFromLoadByIdModelMock = {
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '20/10/2020'
}

export const loadByNameArrayMock: IAccountRepository.Result[] = [
  {
    id: '1',
    name: 'Luciana',
    gender: 'F',
    password: 'hashed_password',
    email: 'valid_email',
    cityId: 1,
    phoneNumber: 'valid_number',
    photo: 'valid_photo',
    dateBirthday: '20/10/2020',
    deleted: true,
    accessToken: 'aAQe3454vcxz',
    role: undefined
  },
  {
    id: '1',
    name: 'Lucia',
    gender: 'F',
    password: 'hashed_password',
    email: 'valid_email',
    cityId: 1,
    phoneNumber: 'valid_number',
    photo: 'valid_photo',
    dateBirthday: '20/10/2020',
    deleted: true,
    accessToken: 'jUIgvV385BC',
    role: undefined
  }
]

export const loadByNameResultMock = [
  {
    id: '1',
    name: 'Luciana',
    gender: 'F',
    email: 'valid_email',
    cityId: 1,
    phoneNumber: 'valid_number',
    photo: 'valid_photo',
    dateBirthday: '20/10/2020'
  },
  {
    id: '1',
    name: 'Lucia',
    gender: 'F',
    email: 'valid_email',
    cityId: 1,
    phoneNumber: 'valid_number',
    photo: 'valid_photo',
    dateBirthday: '20/10/2020'
  }
]

import { AuthenticationModel } from '@/domain/models/authentication'
import { IAddAccount } from '@/domain/usecases/account/add-account'

export const requestMock = {
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  dateBirthday: '20/10/2020'
}

export const requestLoginMock = {
  email: 'valid_email',
  password: 'valid_password'
}

export const addAccountModelUseCaseMock: IAddAccount.Result = {
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  dateBirthday: '13/06/2020',
  deleted: false,
  role: 'admin',
  accessToken: undefined
}

export const authModelMock: AuthenticationModel = {
  name: 'any_name',
  accessToken: 'any_token',
  isAdmin: true
}

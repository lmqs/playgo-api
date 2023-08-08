import { AccountModel } from '@/domain/models/account'

export const accountModelMock: AccountModel = {
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
  accessToken: 'any_token'
}

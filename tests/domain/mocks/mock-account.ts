import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases/account/add-account'

export const mockAccountModel = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'hashed_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  deleted: true
})

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo'
})

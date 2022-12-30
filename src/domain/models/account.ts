export interface AccountModel {
  id: string
  name: string
  user: string
  password: string
  email: string
  cityId: number
  phoneNumber: string
  photo?: string
  deleted?: boolean
}

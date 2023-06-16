export type AccountModel = {
  id: string
  name: string
  gender: string
  password: string
  email: string
  cityId: number
  phoneNumber: string
  dateBirthday?: string
  role?: string
  photo?: string
  deleted?: boolean
  accessToken?: string
}

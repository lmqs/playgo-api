import { AuthenticationModel } from '../../../domain/models/authentication'

export type AuthenticationParams = {
  user: string
  password: string
}
export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationModel | undefined>
}

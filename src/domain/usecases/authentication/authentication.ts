export type AuthenticationModel = {
  user: string
  password: string
}
export interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<string | undefined>
}

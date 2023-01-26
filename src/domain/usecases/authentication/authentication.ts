export type AuthenticationParams = {
  user: string
  password: string
}
export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<string | undefined>
}

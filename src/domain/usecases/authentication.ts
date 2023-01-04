
export interface Authentication {
  auth: (user: string, password: string) => Promise<string>
}

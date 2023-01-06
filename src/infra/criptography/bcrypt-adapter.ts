import bcrypt from 'bcrypt'
import { Hasher } from '../../data/usescases/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (password: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, this.salt)
    return encryptedPassword
  }
}

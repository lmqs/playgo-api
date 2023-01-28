import bcrypt from 'bcrypt'
import { HashComparer, Hasher } from '../../data/protocols/criptography'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async hash (password: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, this.salt)
    return encryptedPassword
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}

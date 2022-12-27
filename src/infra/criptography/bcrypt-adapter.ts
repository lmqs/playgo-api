import { Encrypter } from '../../data/usescases/add-account/db-add-account-protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt)
  }
}

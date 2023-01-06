import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/usescases/protocols/criptography/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (password: string): Promise<string> {
    const encryptedPassword = await bcrypt.hash(password, this.salt)
    return encryptedPassword
  }
}

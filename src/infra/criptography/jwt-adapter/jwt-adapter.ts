import { Decrypter } from '../../../data/usescases/protocols/criptography/decrypter'
import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../data/usescases/protocols/criptography'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string | undefined> {
    const value: any = await jwt.verify(token, this.secret)
    if (value.id) {
      return value.id
    }
  }
}

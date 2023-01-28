import { Decrypter } from '../../../data/protocols/criptography/decrypter'
import { Encrypter } from '../../../data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string | undefined> {
    const value: any = await jwt.verify(token, this.secret)
    return value?.id
  }
}

import jwt, { type JwtPayload } from 'jsonwebtoken'
import { SECRET } from '../config'

if (!SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined')
}

export function generateToken (data: JwtPayload) {
  return jwt.sign(data, SECRET as string, { expiresIn: '1h' })
}

export function verifyToken (token: string) {
  return jwt.verify(token, SECRET as string)
}

export function decodeToken (token: string) {
  return jwt.decode(token)
}

/* TODO
export class JWT {
  static generateToken (data: JwtPayload) {
    return jwt.sign(data, SECRET as string, { expiresIn: '1h' })
  }

  static verifyToken (token: string) {
    return jwt.verify(token, SECRET as string)
  }

  static decodeToken (token: string) {
    return jwt.decode(token)
  }
}
*/

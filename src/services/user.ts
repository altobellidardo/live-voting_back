import { decodeToken } from '../utils/jwt'
import type { Room } from './room'

export interface User {
  id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  admin: boolean,
  roomId: Room['id']
}

export class UserService {
  static gen (name: string, roomId: Room['id'], admin: boolean): User {
    return {
      id: crypto.randomUUID(),
      name,
      admin,
      roomId
    }
  }

  static check (token: string) {
    try {
      const user = decodeToken(token)
      return user
    } catch {
      throw new Error('Invalid token')
    }
  }
}

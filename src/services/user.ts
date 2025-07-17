import type { Room, User } from '../models/user'
import { decodeToken } from '../utils/jwt'

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

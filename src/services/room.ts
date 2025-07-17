import crypto from 'node:crypto'
import type { Room, User } from '../models/user'

export class RoomService {
  static gen (roomName: string) {
    const roomId = crypto.randomUUID().slice(0, 6)
    return {
      id: roomId,
      title: roomName,
      votes: [],
      users: []
    }
  }

  static addUser (room: Room, user: User) {
    room.users.push(user)
  }
}

import crypto from 'node:crypto'
import type { User } from './user'

export interface Room {
  id: string
  title: string
  votes: Vote[]
  users: User[]
}

export interface Vote {
  userId: string
  option: string
}

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

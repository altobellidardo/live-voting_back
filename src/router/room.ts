import { Router } from 'express'
import { generateToken } from '../utils/jwt'
import { RoomService, type Room } from '../services/room'
import { UserService } from '../services/user'

const router = Router()

const rooms: Room[] = []

router.get('/:id', (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400)
      .json({ error: 'Room id is required' })
  }

  const room = rooms.find(room => room.id === id)

  if (!room) {
    return res.status(404)
      .json({ error: 'Room not found' })
  }

  res.json({ room })
})

router.post('/', (req, res) => {
  const { roomName, adminName } = req.body

  if (!roomName || !adminName) {
    return res.status(400)
      .json({ error: 'Room name and username are required' })
  }

  try {
    const room = RoomService.gen(roomName)
    rooms.push(room)

    const user = UserService.gen(adminName, room.id, true)
    RoomService.addUser(room, user)
    rooms.push(room)

    const token = generateToken(user)

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    })
      .json({ room })
      .status(201)
  } catch (error) {
    console.error(error)
    return res.status(500)
      .json({ error: 'Internal server error' })
  }
})

export default router

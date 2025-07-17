import { Router } from 'express'
import { decodeToken } from '../utils/jwt'
import { UserService } from '../services/user'
import { rooms } from './room'

const router = Router()

router.get('/me', (req, res) => {
  const authorization = req.headers.authorization
  const token = authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401)
      .json({ error: 'Unauthorized' })
  }

  try {
    const user = decodeToken(token)
    console.log('user', user)
    res.json({ user })
  } catch {
    res.status(401)
      .json({ error: 'Invalid token' })
  }
})

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400)
      .json({ error: 'Body is required' })
  }

  const { name, roomId } = req.body
  if (!name || !roomId) {
    return res.status(400)
      .json({ error: 'Name and roomId are required' })
  }

  const user = UserService.gen(name, roomId, false)
  rooms.find(room => room.id === roomId)?.users.push(user)
  res.json({ user })
})

export default router

import { Router } from 'express'
import { decodeToken } from '../utils/jwt'

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

export default router

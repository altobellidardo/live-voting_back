import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import { socketManager } from './services/socket'
import { formatDate } from './utils/date'
import roomRouter from './router/room'
import userRouter from './router/user'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { PORT } from './config'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})

app.use(cors({
  origin: 'http://localhost:3005',
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (_req, res) => {
  res.send('API is running')
})

app.use('/rooms', roomRouter)
app.use('/users', userRouter)

socketManager(io)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at ${formatDate(new Date())}`)
})

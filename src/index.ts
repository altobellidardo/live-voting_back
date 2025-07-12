import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const PORT = process.env.PORT ?? 3000

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: '*' }
})

app.use(cors())

app.get('/', (_req, res) => {
  res.send('API is running')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
  socket.on('message', (msg) => {
    io.emit('message', msg)
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

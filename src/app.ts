import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'

import SocketService from './sockets'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})

app.use(cors())

app.use('/', (req, res) => {
  res.send('I got in!')
})

new SocketService(io)

server.listen(3001, () => {
  console.log("WZQ.Socket is running on port 3001")
})
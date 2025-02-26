import { Server } from "socket.io"

import hostGame from "./hostGame"
import joinGame from "./joinGame"
import syncClient from "./syncClient"

class SocketService {
  constructor (io: Server) {
    io.on('connection', (socket) => {
      console.log("a user connected..", socket.id)

      socket.on('disconnect', () => {
        console.log("a user said bye bye", socket.id)
      })

      socket.on('HOST_GAME', data => hostGame({ socket }, data))
      socket.on('JOIN_GAME', data => joinGame({ io, socket }, data))
      socket.on('SYNC_CLIENT', data => syncClient({ socket }, data))
    })
  }
}

export default SocketService
import { Server } from "socket.io"

import hostGame from "./hostGame"

class SocketService {
  constructor (io: Server) {
    io.on('connection', (socket) => {
      console.log("a user connected..", socket.id)

      socket.on('disconnect', () => {
        console.log("a user said bye bye", socket.id)
      })

      socket.on('HOST_GAME', hostGame.bind(null, socket))
      // socket.on('HOST_GAME', data => hostGame(socket, data))
    })
  }
}

export default SocketService
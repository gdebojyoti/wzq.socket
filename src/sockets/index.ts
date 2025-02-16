import { Server as SocketIOServer } from "socket.io";

class SocketService {
  constructor (io: SocketIOServer) {
    io.on('connection', () => {
      console.log("a user connected..")
    })
  }
}

export default SocketService
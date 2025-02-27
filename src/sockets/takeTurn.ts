import { TakeTurnData } from "../types/socketEvents"
import GameService from "../services/GameService"

export default function takeTurn ({ io, socket }: any, data: TakeTurnData) {
  const turnData = GameService.takeTurn(data)

  if (!turnData) {
    // inform client of error
    socket.emit("ERROR", {
      type: 'TAKE_TURN',
      msg: 'Turn failed'
    })
  } else {
    // inform everyone of created game details
    io.sockets.emit("TURN_TAKEN", turnData)
  }
}
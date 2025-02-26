import { JoinGameData } from "../types/socketEvents"
import GameService from "../services/GameService"

export default function joinGame ({ io, socket }: any, data: JoinGameData) {
  const game = GameService.joinGame(data)

  if (!game) {
    // inform client of error
    socket.emit("ERROR", {
      type: 'JOIN_GAME',
      msg: 'Incorrect code. Please try again'
    })
  } else {
    console.log("Joined the game", data, game.id)
    // inform everyone that game has started
    io.sockets.emit("GAME_STARTED", game)
  }
}
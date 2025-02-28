import { TakeTurnData } from "../types/socketEvents"
import GameService from "../services/GameService"
import { GameStatus } from "../types/entities"

export default function takeTurn ({ io, socket }: any, data: TakeTurnData) {
  const turnData = GameService.takeTurn(data)

  if (!turnData) {
    // inform client of error
    socket.emit("ERROR", {
      type: 'TAKE_TURN',
      msg: 'Turn failed'
    })
    return
  }

  // inform everyone of created game details
  io.sockets.emit("TURN_TAKEN", turnData)

  const gameStatus = GameService.updateAndGetGameStatus(data.gameId)

  if (gameStatus && [GameStatus.Completed, GameStatus.Stalemate].includes(gameStatus)) {
    // inform everyone of victory
    io.sockets.emit("GAME_OVER", {
      didWin: true
    })
  }
}
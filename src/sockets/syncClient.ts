import { SyncGameInput } from "../types/socketEvents"
import GameService from "../services/GameService"

export default function syncClient ({ socket }: any, data: SyncGameInput) {
  const game = GameService.getGameDetails(data)

  if (!game) {
    // inform client of error
    socket.emit("ERROR", {
      type: 'SYNC_GAME',
      msg: 'Game not found'
    })
  } else {
    // inform client of created game details
    socket.emit("SYNC_GAME_DETAILS", game)
  }
}
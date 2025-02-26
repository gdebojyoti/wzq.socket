import { HostGameData } from "../types/socketEvents"
import GameService from "../services/GameService"

export default function hostGame ({ socket }: any, data: HostGameData) {
  const game = GameService.createGame(data.playerId)

  if (!game) {
    // // inform client of error
    // socket.emit("error", {
    //   msg: 'Could not create game'
    // })
  } else {
    console.log("A new game is being hosted", data, game.id)
    // inform client of created game details
    socket.emit("GAME_CREATED", game)
  }
}
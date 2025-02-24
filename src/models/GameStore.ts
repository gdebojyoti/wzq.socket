import { Game, GameStatus } from "../types/entities"

class GameStore {
  static instance: GameStore
  games: Game[] = []

  constructor () {
    if (!GameStore.instance) {
      GameStore.instance = this
    }

    return GameStore.instance
  }

  addGame (game: Game) {
    this.games.push(game)
  }

  joinGame (gameCode: string) {
    // search for game
    const game = this.games.find(({ code }) => code === gameCode)

    // check if game is found
    if (game) {
      // remove game code
      delete game.code

      // set status to Ongoing
      game.status = GameStatus.Ongoing

      return game
    }

    throw new Error ("Game not found")
  }
}

export default GameStore
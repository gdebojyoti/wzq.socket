import { Game } from "../types/entities"

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
}

export default GameStore
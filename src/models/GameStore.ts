import { Game, GameStatus } from "../types/entities"
import { JoinGameData, SyncGameInput, TakeTurnData } from "../types/socketEvents"
import checkIfPlayersTurn from "../utils/checkIfPlayersTurn"

class GameStore {
  static instance: GameStore

  // games: Game[] = []
  games: Game[] = [
    {
      "id": "1740570526738",
      "rowSize": 16,
      "colSize": 16,
      "status": GameStatus.Ongoing,
      "playerIds": [
        "001",
        "002"
      ],
      "hostPlayerId": "001",
      "winnerPlayerId": "",
      "createdAt": 1740570526738,
      "turns": []
    }
  ]

  constructor () {
    if (!GameStore.instance) {
      GameStore.instance = this
    }

    return GameStore.instance
  }

  addGame (game: Game) {
    this.games.push(game)
  }

  joinGame ({ gameCode, playerId }: JoinGameData) {
    // search for game
    const game = this.games.find(({ code, status }) => (code === gameCode && status === GameStatus.Lobby))

    // check if game is found
    if (game) {
      // remove game code
      delete game.code

      // add player to list
      game.playerIds = [...game.playerIds, playerId]

      // set status to Ongoing
      game.status = GameStatus.Ongoing

      return game
    }

    throw new Error ("Game not found")
  }

  getGameDetails ({ playerId, gameId }: SyncGameInput) {
    // search for game
    const game = this.games.find(({ id, playerIds }) => (id === gameId && playerIds.includes(playerId)))

    // check if game is found
    if (game) {
      return game
    }

    throw new Error ("Game not found")
  }

  takeTurn ({ playerId, cell, gameId }: TakeTurnData) {
    // search for game
    const game = this.games.find(({ id, playerIds }) => (id === gameId && playerIds.includes(playerId)))

    // check if game is found
    if (!game) {
      throw new Error ("Game not found")
    }

    try {
      const { turns, hostPlayerId } = game
      const isPlayersTurn = checkIfPlayersTurn(turns, playerId, hostPlayerId)

      // check if game is found
      if (!isPlayersTurn) {
        throw new Error ("Invalid turn")
      }

      const turn = {
        cell,
        playerId
      }

      turns.push(turn)

      return turn
    } catch (e) {
      throw e
    }
  }
}

export default GameStore
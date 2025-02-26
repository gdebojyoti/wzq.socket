import GameStore from '../models/GameStore'
import { Game, GameStatus } from '../types/entities'
import { SyncGameInput } from '../types/socketEvents'

class GameService {
  static gameStore = new GameStore()
  
  static createGame (playerId: string) {
    const id = new Date().getTime().toString() // generate dynamic ID - using current timestamp
    const code = Math.floor(Math.random() * 1000000).toString() // generate random 6 digit code
    const createdAt = new Date().getTime() // get current timestamp

    const game: Game = {
      id,
      code,
      rowSize: 16, // default row size (16)
      colSize: 16, // default column size (16)
      status: GameStatus.Lobby, // default status of game is "Lobby"
      playerIds: [playerId],
      hostPlayerId: playerId,
      winnerPlayerId: '',
      createdAt,
      turns: []
    }

    try {
      GameService.gameStore.addGame(game)
      return game
    } catch (err) {
      console.error("Failed to add the game", err)
      return null
    }
  }

  static joinGame (gameCode: string) {
    try {
      const game = GameService.gameStore.joinGame(gameCode)
      return game
    } catch (err) {
      console.error("Failed to add the game", err)
      return null
    }
  }

  static getGameDetails (data: SyncGameInput) {
    try {
      const game = GameService.gameStore.getGameDetails(data)
      return game
    } catch (err) {
      console.error("Failed to find the game", err)
      return null
    }
  }
}

export default GameService
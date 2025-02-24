import GameStore from '../models/GameStore'
import { Game, GameStatus } from '../types/entities'

class GameService {
  static gameStore = new GameStore()
  
  static createGame () {
    const id = new Date().getTime().toString() // generate dynamic ID - using current timestamp
    const code = Math.floor(Math.random() * 1000000).toString() // generate random 6 digit code
    const createdAt = new Date().getTime() // get current timestamp

    const game: Game = {
      id,
      code,
      rowSize: 16, // default row size (16)
      colSize: 16, // default column size (16)
      status: GameStatus.Lobby, // default status of game is "Lobby"
      playerIds: [],
      hostPlayerId: '',
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
}

export default GameService
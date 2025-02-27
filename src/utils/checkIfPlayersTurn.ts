import { Turn } from "../types/entities"

export default function checkIfPlayersTurn (turns: Turn[], playerId: string, hostPlayerId: string) {
  // if no turns have been taken host player takes the first turn
  if (!turns.length) {
    return playerId === hostPlayerId
  }

  // check player id from most recent turn; current turn belongs to the other player
  const mostRecentTurn = turns[turns.length - 1]
  return mostRecentTurn.playerId !== playerId
}

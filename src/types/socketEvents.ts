import { Turn } from "./entities"

export type HostGameData = {
  playerId: string
}

export type JoinGameData = {
  playerId: string
  gameCode: string
}

export type SyncGameInput = {
  playerId: string
  gameId: string
}

export type TakeTurnData = Turn
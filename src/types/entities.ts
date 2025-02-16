export type Player = {
  id: string
  name: string
  played: number
  won: number
  lost: number
  drawn: number
  games: string[] // array of game IDs; recent games first
}

export type Game = {
  id: string
  code?: string // 6 digit code, treated as string; should be removed once status is no longer 'Lobby'
  rowSize: number
  colSize: number
  status: GameStatus
  playerIds: string[] // host player ID is always the 0th item
  hostPlayerId: string
  winnerPlayerId: string
  createdAt: number // timestamp
  turns: Turn[]
}

export enum GameStatus {
  Lobby,
  Ongoing,
  Completed,
  Stalemate // all cells filled without any winner
}

export type Turn = {
  playerId: string
  cell: Cell
}

export type Cell = {
  rowId: number
  colId: number
}
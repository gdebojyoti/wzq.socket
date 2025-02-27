import { Turn } from "../types/entities"

export default function checkForVictory (turns: Turn[]) {
  const { cell: { rowId, colId }, playerId: lastPlayerId } = turns[turns.length - 1]
  
  // initialize empty 2d array
  const arr = new Array(16).fill('').map(_ => new Array(16).fill(0))

  // populate array with occupied cells
  turns.forEach(({ cell: { rowId, colId }, playerId }) => {
    if (playerId === lastPlayerId) {
      arr[rowId][colId] = 1
    }
  })

  // check if 5 consecutive cells exist horizontally ➡️
  let count = 0
  for (let j = 0; j < 16; j++) {
    if (arr[rowId][j] === 1) {
      count++
      if (count === 5) {
        console.log("HOR!!!")
        return true
      }
    } else {
      count = 0
    }
  }
  
  // check if 5 consecutive cells exist vertically ⬇️
  count = 0
  for (let i = 0; i < 16; i++) {
    if (arr[i][colId] === 1) {
      count++
      if (count === 5) {
        console.log("VER!!!")
        return true
      }
    } else {
      count = 0
    }
  }

  // check top-left to bottom-right diagonal ↘️
  count = 0
  let startRow = rowId, startCol = colId
  while (startRow > 0 && startCol > 0) {
    startRow--
    startCol--
  }
  while (startRow < 16 && startCol < 16) {
    if (arr[startRow][startCol] === 1) {
      count++
      if (count === 5) {
        console.log("TL-BR DIAG!!!")
        return true
      }
    } else {
      count = 0
    }
    startRow++
    startCol++
  }

  // check top-right to bottom-left diagonal ↙️
  count = 0
  startRow = rowId
  startCol = colId
  while (startRow > 0 && startCol < 15) {
    startRow--
    startCol++
  }
  while (startRow < 16 && startCol >= 0) {
    if (arr[startRow][startCol] === 1) {
      count++
      if (count === 5) {
        console.log("TR-BL DIAG!!!")
        return true
      }
    } else {
      count = 0
    }
    startRow++
    startCol--
  }
}
import { HostGameData } from "../types/socketEvents"

export default function hostGame (data: HostGameData) {
  console.log("A new game is being hosted", data)
}
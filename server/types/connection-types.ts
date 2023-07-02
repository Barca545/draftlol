import { WebSocket } from "ws"

export interface WS_URL {
  matchID: string,
  componentid: string
}

export interface Socket {
  ID: string,
  socket: WebSocket
}
export interface Connection {
  matchID: string,
  timerIDs: Socket[],
  draftIDs: Socket[],
  }


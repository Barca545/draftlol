import { WebSocketServer } from "ws"

export interface Client {
    uuid: string,
    side: 'blue' | 'red' | 'spectator'
    readyState: WebSocket['CONNECTING'] | WebSocket['OPEN'] | WebSocket['CLOSING'] | WebSocket['CLOSED']
}
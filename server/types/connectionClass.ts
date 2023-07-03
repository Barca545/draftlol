import {WebSocket, WebSocketServer,RawData} from 'ws';

class SocketConnection {
    connection: WebSocket
    type: string
    id: string
    
    constructor(connection: WebSocket, type:string, id:string) {
        this.connection = connection
        this.type = type
        this.id = id
    }
}
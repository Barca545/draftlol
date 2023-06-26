import { WebSocketServer} from 'ws';
import RedList from './redlisttest.js';
import {v4 as uuidv4} from 'uuid'
import { DraftList } from './types/champ-select-types.js';
import { Client } from './types/clients.js';
import { PORT } from './port.js';

///const PORT = 8080

console.log(`server running on ${PORT}`)

const wss = new WebSocketServer({ port:PORT });

const clients = {}

///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(DraftList:DraftList) {
  const data = JSON.stringify(DraftList)
  
  ///send all clients the same draft list and then break it down in the clients
  for (let userId in clients) {
    let client = clients[userId]
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
      console.log(data)
    }
  }
}

const handleMessage = (message) => {
  const clientData:DraftList = JSON.parse(message)
  console.log(clientData)
  broadcastMessage(clientData)
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ///when the connection is established it needs to note which ID belongs to which side
  const clientId = uuidv4()
  clients[clientId] = connection
  console.log(`User ${clientId} connected`)

  ws.on('message', (data) => {
    handleMessage(data)
  });
});
import {WebSocket, WebSocketServer,RawData} from 'ws';
import RedList from './redlisttest.js';
import {v4 as uuidv4} from 'uuid'
import { DraftList } from './types/champ-select-types.js';
import { Client } from './types/clients.js';
import { PORT } from './port.js';

///Whenever a new client connects they need to be sent the current draftlist
///figure out why ws.send() does not work inside 
///https://stackoverflow.com/questions/12192321/is-it-possible-to-send-a-data-when-a-websocket-connection-is-opened
///currently the incomplete redDraft page is causing wonky things with bans so fix that and see if it persists
///shows the bans as red bans but for some reason the most recent one toggles on and off
///if i had to guess this is partially caused by the let draftList being wrong
///current issue where new draft overwrites old one if someone joins the draft captain
/*
 - couple possible ways to do this 
 1) clientside onOpen sends a request for data
 2) if statement in the ws.on('connect') that says to send the thing 
*/
console.log(`server running on ${PORT}`)

const wss = new WebSocketServer({ port:PORT });

const clients = {}

///current draftlist state updated whenever a new message comes 
let draftList:null|string = null

///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(DraftList:DraftList) {
  const data = JSON.stringify(DraftList)
  draftList = data
  for (let clientId in clients) {
    let client = clients[clientId]
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
      console.log(draftList)
    }
  }
}

const handleMessage = (message:RawData) => {
  const clientData:DraftList = JSON.parse(message.toString())
  ///console.log(clientData)
  broadcastMessage(clientData)
}

wss.on('connection', function(ws:WebSocket) {
  ws.on('error', console.error);

  ///when the connection is established it needs to note which ID belongs to which side
  const clientId = uuidv4()
  clients[clientId] = ws
  console.log(`User ${clientId} connected`)

  ws.on('message', (message) => {
    handleMessage(message)
  });

  ws.on('close', (event:CloseEvent)=>{
    const closeCode = event.code
    console.log(closeCode)
  
  ///on connection send the draftlist
  ws.on('open',function open(){
    ws.send(draftList)
  })

  })
});
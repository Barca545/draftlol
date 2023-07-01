import {WebSocket, WebSocketServer,RawData} from 'ws';
import {initialDraftList}
 from './initialStates/initialDraftList.js';
import {v4 as uuidv4} from 'uuid'
import { DraftList, isTimer, DraftRequest, Timer } from './types/champ-select-types.js';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser';

///current draftlist state updated whenever a new message comes 
/*eventuall 
may need to change the scope of draftList when I make this support multiple websockets*/
let draftList:string = JSON.stringify(initialDraftList)
let timer:string = JSON.stringify({seconds:60})

dotenv.config()

const app:Express = express()
const port = process.env.SERVER_PORT || 8080
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const server = http.createServer(app)
const wss = new WebSocketServer({server:server});

const clients = {}


function broadcastDraft(list:DraftList) {
  const draftData = JSON.stringify(list)
  draftList = draftData
  for (let clientId in clients) {
    let client = clients[clientId]
    if (client.readyState === WebSocket.OPEN) {
      client.send(draftData)
    }
  }
}

function broadcastTimer(time:Timer){
  timer = JSON.stringify(time)
  for (let clientId in clients) {
    let client = clients[clientId]
    if (client.readyState === WebSocket.OPEN) {
      client.send(timer)
    }
  }
}

const handleMessage = (message:RawData) => {
  const clientData:DraftList | Timer = JSON.parse(message.toString())
  if (isTimer(clientData)) {
    broadcastTimer(clientData)
  }
  else{broadcastDraft(clientData)}
  
}

wss.on('connection', (ws:WebSocket,req) => {
  ws.on('error', console.error);

  ws.send(draftList)
  ws.send(timer)

  ///when the connection is established it needs to note which ID belongs to which side
  const clientId = uuidv4()
  clients[clientId] = ws
  console.log(`User ${clientId} connected`)

  ws.on('message', (message) => {
    handleMessage(message)
  });

  ws.on('close', (event:CloseEvent)=>{
    const closeCode = event.code
  })
});

///api endpoints would like to put them in a different folder at some point 
app.get('/draftlist', (req:Request, res:Response)=> {
  ///may have to use JSON.parse on the other end since this is now a JSON string
  res.send(draftList)
})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
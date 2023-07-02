import {WebSocket, WebSocketServer,RawData} from 'ws';
import {initialDraftList}
 from './initialStates/initialDraftList.js';
import {v4 as uuidv4} from 'uuid'
import { DraftList,DraftRequest, Timer } from './types/champ-select-types.js';
import { isTimer,isDraftlist } from './types/type-guards.js';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser';
import { WS_URL, Socket, Connection} from './types/connection-types.js';
import { isConnection } from './types/type-guards.js';

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

const connections:Connection[] = []

function broadcastDraft(list:DraftList) {
  const draftData = JSON.stringify(list)
  draftList = draftData
  for (let connection in connections) {
    ///console.log(connections)
  }
}

function broadcastTimer(time:Timer){
  timer = JSON.stringify(time)
  for (let connection in connections) {
    ///console.log(connections)
  }
}

const handleMessage = (message:RawData) => {
  const clientData: DraftList | Timer = JSON.parse(message.toString())
  if (isTimer(clientData)) {
    broadcastTimer(clientData)
  }
  ///problem is this line, it is broadcasting draft every time the 
  else if (isDraftlist(clientData)) {
    broadcastDraft(clientData)}
}

wss.on('connection', (ws:WebSocket,req) => {
  ws.on('error', console.error);

  const urlArray = req.url.split('/')

  const url:WS_URL = {
    matchID:urlArray[1],
    componentid:urlArray[2]
  }

  const socket:Socket = {
    ID: uuidv4(),
    socket: ws
  }

  const connectionIndex = connections.findIndex((matchID)=>{return matchID.matchID===url.matchID})

  if (connectionIndex!==-1){
    if (url.componentid==='timer') {
      connections[connectionIndex].timerIDs.push(socket)
      ws.send(timer)
    }
    else if (url.componentid==='draft'){
      connections[connectionIndex].draftIDs.push(socket)
      ws.send(draftList)
    }
  else if (connectionIndex===-1) {
    console.log('else')
    if (url.componentid==='timer'){
      const connection:Connection = {
        matchID:url.matchID,
        timerIDs: [socket],
        draftIDs: [],
      }
      connections.push(connection)
      ws.send(timer)
    } 
    else if (url.componentid==='draft'){
      const connection:Connection = {
        matchID:url.matchID,
        timerIDs: [],
        draftIDs: [socket],
      }
      connections.push(connection)
      ws.send(draftList)
    }
  }
  }

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
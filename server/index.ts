import {WebSocket, WebSocketServer,RawData} from 'ws';
import {initialDraftList}
 from './initialStates/initialDraftList.js';
import {v4 as uuidv4} from 'uuid'
import { DraftList, DraftRequest, Timer } from './types/champ-select-types.js';
import { isTimer,isDraftlist } from './types/type-guards.js';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser';
import { WS_URL, Socket, Connection} from './types/connection-types.js';
import { isConnection } from './types/type-guards.js';
import { SocketConnection } from './types/connectionClass';

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

const connections:SocketConnection[] = []

function broadcastDraft(list:DraftList) {
  const draftData = JSON.stringify(list)
  draftList = draftData
  connections.map((connection)=>{
    if (connection.type==='draft') {connection.socket.send(draftData)}
  })
}

function broadcastTimer(time:Timer){
  const timerData = JSON.stringify(time)
  timer = timerData
    connections.map((connection)=>{
      if (connection.type==='timer') {connection.socket.send(timerData)}
    })
}

const handleMessage = (message:RawData) => {
  const clientData: DraftList | Timer = JSON.parse(message.toString())
  if (isTimer(clientData)) {
    broadcastTimer(clientData) 
  }
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

  //stick them all in the same connections and just broadcast timer messages to all timers and draft messages to all draft types
  switch (url.componentid) {
    case 'timer':{
      const connection = new SocketConnection(ws,'timer',uuidv4())
      connections.push(connection)
      console.log(`Timer: ${connection.id} connnected`)
      ws.send(timer)
      break
    }
    case 'draft':{
      const connection = new SocketConnection(ws,'draft',uuidv4())
      connections.push(connection)
      console.log(`Draft: ${connection.id} connnected`)
      ws.send(draftList)
      break
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

/*
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser';
import {Server} from "socket.io";

dotenv.config()

const app:Express = express()
const port = process.env.SERVER_PORT || 8080
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const server = http.createServer(app)

let io = new Server()

io.on('connection', (socket)=>{
  console.log()


})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});*/
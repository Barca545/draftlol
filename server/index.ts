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
import { SocketConnection, Matches, Match } from './types/connectionClass';

///current draftlist state updated whenever a new message comes 
/*eventuall 
may need to change the scope of draftList when I make this support multiple websockets*/
dotenv.config()

const app:Express = express()
const port = process.env.SERVER_PORT || 8080
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const server = http.createServer(app)
const wss = new WebSocketServer({server:server});

const matches = new Matches()

wss.on('connection', (ws:WebSocket,req) => {
  ws.on('error', console.error);
  
  const urlArray = req.url.split('/')

  const url:WS_URL = {
    matchID:urlArray[1],
    componentid:urlArray[2]
  }
  ///needs to add to the same match 
  matches.addMatch(url.matchID)

  switch (url.componentid) {
    case 'timer':{
      const connection = new SocketConnection(ws,'timer',uuidv4())
      const match = matches.findMatch(url.matchID)
      match.addTimerConnection(connection)
      console.log(`Timer: ${connection.id} connnected`)
      break
    }
    case 'draft':{
      const connection = new SocketConnection(ws,'draft',uuidv4())
      const match = matches.findMatch(url.matchID)
      match.addDraftConnection(connection)
      console.log(`Draft: ${connection.id} connnected`)
      break
    }
  }
  
  ws.on('message', (messageData) => {
    matches.handleMessage(messageData,url.matchID) 
  });

  ws.on('close', (event:CloseEvent)=>{
    const closeCode = event.code
  })
});


/*app.get('/draftlist', (req:Request, res:Response)=> {
  ///may have to use JSON.parse on the other end since this is now a JSON string
  res.send(draftList)
})*/

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
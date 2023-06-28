import {WebSocket, WebSocketServer,RawData} from 'ws';
import {initialDraftList}
 from './initialStates/initialDraftList.js';
import {v4 as uuidv4} from 'uuid'
import { DraftList } from './types/champ-select-types.js';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http'
import cors from 'cors'

///https://stackoverflow.com/questions/12192321/is-it-possible-to-send-a-data-when-a-websocket-connection-is-opened
///current issue where new draft overwrites old one if someone joins the draft captain

///need to add an api to get the draft at the end
///need to attach the summoner roles to the draftlist JSON
///each new match needs to spin up a new server instance


dotenv.config()

const app:Express = express()
const port = process.env.SERVER_PORT || 8080
app.use(cors())

const server = http.createServer(app)

///current draftlist state updated whenever a new message comes 
let draftListstring:string = JSON.stringify(initialDraftList)
///need to update draftList wherever it pops up to 
let draftList = initialDraftList

const wss = new WebSocketServer({ server:server });

const clients = {}

///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(DraftList:DraftList) {
  const draftData = JSON.stringify(DraftList)
  draftListstring = draftData
  for (let clientId in clients) {
    let client = clients[clientId]
    if (client.readyState === WebSocket.OPEN) {
      ///send queues information which explains why it isn't sending until the next message
      client.send(draftData)
    }
  }
}

const handleMessage = (message:RawData) => {
  const clientData:DraftList = JSON.parse(message.toString())
  ///eventuall I think I need to change the scope of draftList when I make this support multiple websockets
  draftList = clientData
  broadcastMessage(clientData)
  console.log(clientData.blueTurn)
}

wss.on('connection', (ws:WebSocket,req) => {
  ws.on('error', console.error);
  ///can use this to separate sides 
  //const url = new URL(req.url, `http://${req.headers.host}`);
  ///console.log(url)

  ///send the draftList here
  ws.send(draftListstring)

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
  res.send(draftList)
})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
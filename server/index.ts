import {WebSocket, WebSocketServer,RawData} from 'ws';
import RedList from './draftlistInitialState.js';
import {v4 as uuidv4} from 'uuid'
import { DraftList } from './types/champ-select-types.js';
import { Client } from './types/clients.js';
import { PORT } from './port.js';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';


const server:Express = express()

///https://stackoverflow.com/questions/12192321/is-it-possible-to-send-a-data-when-a-websocket-connection-is-opened
///current issue where new draft overwrites old one if someone joins the draft captain

///can use params to tell if red or blue
///red or blue have their own param and then it splits them into different client bodies based on that 
///send only red info to red and only blue to blue
console.log(`server running on ${PORT}`)

const wss = new WebSocketServer({ port:PORT });

const clients = {}

///current draftlist state updated whenever a new message comes 
let draftList:string = JSON.stringify(RedList)

///obviously have to confirm the logic here is what I want since I just copied it from the tutorial
function broadcastMessage(DraftList:DraftList) {
  const data = JSON.stringify(DraftList)
  draftList = data
  for (let clientId in clients) {
    let client = clients[clientId]
    if (client.readyState === WebSocket.OPEN) {
      ///send queues information which explains why it isn't sending until the next message
      client.send(data)
    }
  }
}

const handleMessage = (message:RawData) => {
  const clientData:DraftList = JSON.parse(message.toString())
  broadcastMessage(clientData)
}

wss.on('connection', (ws:WebSocket,req) => {
  ws.on('error', console.error);
  ///can use this to separate sides 
  //const url = new URL(req.url, `http://${req.headers.host}`);
  ///console.log(url)

  ///send the draftList here
  ws.send(draftList)

  ///when the connection is established it needs to note which ID belongs to which side
  const clientId = uuidv4()
  clients[clientId] = ws
  console.log(`User ${clientId} connected`)

  ws.on('message', (message) => {
    handleMessage(message)
  });

  ws.on('close', (event:CloseEvent)=>{
    const closeCode = event.code
    console.log('close code')
    console.log(closeCode)    
  })
});
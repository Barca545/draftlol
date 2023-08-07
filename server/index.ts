import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {createServer} from 'http'
import cors from 'cors'
import bodyParser from 'body-parser';
import { Server, Socket } from "socket.io";
import { Match } from './types/connectionClass';

///current draftlist state updated whenever a new message comes 
/*eventuall 
may need to change the scope of draftList when I make this support multiple websockets*/
dotenv.config()

const app:Express = express()
const port = process.env.SERVER_PORT || 8080
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const server = createServer(app)
const io = new Server(server,{
  //needed for dev
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
})

//actually instead of matches this should maybe
const matches:Match[] = []

io.on('connection', (socket:Socket)=>{
  //console.log(`User Connected ${socket.id}`)
  const gameid = socket.handshake.query.gameid
  
  //could separate the timer by having a draft/timer element to the query
  socket.join(gameid)

  //how do I have it emit the game stuff
  io.to(gameid).emit('test')
  
  //possibly move to separate file
  const handleMessage = () => {
    //io.to(gameid).emit(draft)
    //easiest way to do this is use the function I commented out to hold an array of matches and just emit the match corresoponding to the game id 
    //I feel tho like socket io must have native support for this
  }

  io.sockets.on('message', () => handleMessage())
  
  //this might be unnessecary since rooms mean I can just assign them to a room based on game ID
  /*
  if (matches.some((match)=> {return match.id == gameid})){
  }
  else {
    matches.push(new Match(gameid,60))
    
  }*/
})

//do I need this with Socketio
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});
import {WebSocket,RawData} from 'ws';
import { DraftList,Timer } from './champ-select-types';
import { initialDraftList } from '../initialStates/initialDraftList';
import { isTimer, isDraftlist } from './type-guards';


///socket connection could probably be an interface
///only reason not to do this is because I feel to lazy to refactor the code in index
export class SocketConnection {
  id: string
  type: 'timer' | 'draft'
  socket: WebSocket
  
  constructor(socket: WebSocket, type:'timer' | 'draft', id:string ){
    this.id = id
    this.type = type
    this.socket = socket
  }
}

///this can either be called with a [POST] request from the create draft page or with an API [POST] call

export class Match {
  id: string ///this needs to be immutable once created
  timer: Timer
  draft: DraftList 
  champList: string[][]
  players: [] ///type this probably just an interface with name and role 
  timerConnections: SocketConnection[]
  draftConnections: SocketConnection[]

  constructor (time=60, id:string) {
    this.id = id
    this.timer = {seconds:time}
    this.draft = initialDraftList
    this.champList = initialDraftList.champList//might not need since I am not splitting out the champ list
    this.players = []
    this.timerConnections = []
    this.draftConnections = []
  }

  broadcastDraft(draftlist:DraftList) {
    const draftData = JSON.stringify(draftlist)
    this.draft = draftlist
    this.draftConnections.map((connection)=>{
      connection.socket.send(draftData)
    })
  }
  
  broadcastTimer(time:Timer){
    const timerData = JSON.stringify(time)
    this.timer = time
    this.timerConnections.map((connection)=>{
      connection.socket.send(timerData)
    })
  }

  addTimerConnection = (connection:SocketConnection) => {
    if(this.timerConnections.includes(connection)===false) {
      this.timerConnections.push(connection)
      connection.socket.send(JSON.stringify(this.timer))
    }
  }
  addDraftConnection = (connection:SocketConnection) => {
    if(this.draftConnections.includes(connection)===false) {
      this.draftConnections.push(connection)
      connection.socket.send(JSON.stringify(this.draft))
    }
  }
}

export class Matches {
  list: Match[]

  constructor () {
    this.list = []
  }

  updateDraft = (id:string,draftList:DraftList) =>{
    this.list.map((match)=>{
      if (match.id===id) {
        match.draft = draftList
      }
    })
  }

  updateTimer = (id:string,timer:Timer) =>{
    this.list.map((match)=>{
      if (match.id===id) {
        match.timer = timer
      }
    })
  }

  handleMessage = (message:RawData,matchid:string) => {
    const clientData: DraftList | Timer = JSON.parse(message.toString())
    const match = this.findMatch(matchid)
    
    if (isTimer(clientData)) {
      match.broadcastTimer(clientData) 
      this.updateTimer(matchid,clientData)
    }
    else if (isDraftlist(clientData)) {
      match.broadcastDraft(clientData)
      this.updateDraft(matchid,clientData)
    }
  }

  destroyMatch = (id:string) => {
    const index = this.list.findIndex(match=>match.id===id)
    this.list.splice(index,1)
  }

  ///this needs to generate the new match from data given to it
  addMatch = (matchid:string) => {
    if(this.list.find((match)=>{match.id=matchid})===undefined) {
      const newMatch = new Match(60,matchid)
      this.list.push(newMatch)
      newMatch.broadcastDraft(newMatch.draft)
      newMatch.broadcastTimer(newMatch.timer)
    } 
    //broadcast the match's data if it already exists
    else {
      const currentMatch = this.list.find(match=>match.id===matchid)
      currentMatch.broadcastDraft(currentMatch.draft)
      currentMatch.broadcastTimer(currentMatch.timer)
    }
  }

  findMatch = (id:string) => {
    return (
      this.list.find((match)=>match.id=id)
    )}
}
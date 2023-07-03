import {WebSocket} from 'ws';
import { DraftList,Timer } from './champ-select-types';
import { initialDraftList } from '../initialStates/initialDraftList';

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
  players: [] ///type this probably just an interface with name and role 
  connections: SocketConnection[]

  constructor (time=60, id:string) {
    this.id = id
    this.timer = {seconds:time}
    this.draft = initialDraftList
  }
}

export class Matches {
  list: Match[]

  updateDraft = (id:string,draftList:DraftList) =>{
    this.list.map((match)=>{
      if (match.id===id) {
        match.draft = draftList
      }
    })
  }

  destroyDraft = (id:string) => {
    const index = this.list.findIndex(match=>match.id===id)
    this.list.splice(index,1)
  }

    ///add match that uses includes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    ///before pushing a match to the array
    addDraft = (match:Match) => {
      if(this.list.includes(match)===false) {
        this.list.push(match)
      }
      ///not 100% sure I want it to update a list if that list included
      /*else {
        this.updateDraft(match.id,match.draft)
      }*/
    }
}
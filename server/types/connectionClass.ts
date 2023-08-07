import {WebSocket,RawData} from 'ws';
import { DraftList,Timer } from './champ-select-types';
import { initialDraftList } from '../initialStates/initialDraftList';
import { isTimer, isDraftlist } from './type-guards';
import { initalAllChamps } from '../initialStates/initalAllChamps';

///socket connection could probably be an interface
///only reason not to do this is because I feel to lazy to refactor the code in index
export class Match {
  id: string|string[] ///this needs to be immutable once created
  timer: number
  draft: DraftList 
  champlist: string[][]
  players: []

  constructor (id:string|string[],timer:number){
    this.id = id
    this.timer = timer
    this.draft = initialDraftList
    this.champlist = initalAllChamps
    this.players = []
  }
}
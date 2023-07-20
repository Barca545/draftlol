import {useState, useEffect} from 'react'
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl";
import {Summoner, DraftList} from "../App/Types/champ-select-types";
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

export const RedSummonerSelect = (props:{players:Summoner[],draft:DraftList,champName:string}) => {
const [player, setPlayer] = useState(props.players[0])
const [draft,setDraft] = useState<DraftList>(props.draft)

const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
  onOpen: () => console.log('connection opened'),
  onClose: () => console.log('connection closed'),
  onMessage: (message:WebSocketEventMap['message']) => {
    let data:DraftList = JSON.parse(message.data)
    setDraft(data)
  },
  share:true, 
  retryOnError: true,
  shouldReconnect: () => true
  })

  useEffect(()=>{
    const newDraft = {...draft}
    const pickIndex = draft.redPicks.findIndex(pick=>{return pick.champ === props.champName})
    newDraft.redPicks[pickIndex].summoner = player
    sendMessage(JSON.stringify(newDraft))
  },[player])

const handleNameChange = (name:string) => {
  const index = props.players.findIndex((player)=>{return player.name===name})
  setPlayer(props.players[index])
}

const handleRoleChange = (role:string) => {
  const newPlayer:Summoner = {name:player.name, role:role}
  setPlayer(newPlayer)
}

return(
  <div className="champ-assignments">
    <select value={player.name} onChange={(e)=>handleNameChange(e.target.value)}>
      {props.players.map((player)=>{
        return(
          <option key={player.name} value={player.name}>{player.name}</option>
        )
      })}
    </select>
    <select value={player.role} onChange={(e)=>handleRoleChange(e.target.value)}>
    {props.players.map((player)=>{
      return(
        <option key={player.role} value={player.role}>{player.role}</option>
      )
    })}
    </select>
  </div>
)
}

import { useState } from "react"
import { Summoner } from "../App/Types/champ-select-types"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { DraftList } from "../App/Types/champ-select-types"
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl"

///props will have to be the champion name so include it inside the summoner Div somewhere
///embed this in the pick div and 
///somehow have the div pass the champ name to this and give it the ability to update the draft

export const RoleSelect = (props:{champion:string,draft:DraftList}) => {
  const [position, setPosition] = useState('TOP')
  
  const summoners:Summoner[] = [
    {summonerName:'Fish',role:'TOP',champion:'',icon:''},
    {summonerName:'Ouken',role:'JUNGLE',champion:'',icon:'null'},
    {summonerName:'HappyBlueGuy',role:'MIDDLE',champion:'',icon:''},
    {summonerName:'Envoker',role:'BOTTOM',champion:'',icon:''},
    {summonerName:'adc',role:'SUPPORT',champion:'',icon:''}
  ]
  
  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    share:true, 
    retryOnError: true,
    shouldReconnect: () => true
    })
    
    const handleSelection = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setPosition(e.target.value[0])
      const newDraft = {...props.draft}
      //look for the index somehow
      newDraft.bluePicks[0].role = e.target.value[0]
      newDraft.bluePicks[0].summonerName = e.target.value[1]
      newDraft.bluePicks[0].champion = props.champion 
    }
    
    return(
      <div className="role-selection">
        <select className='summoner-selection' onChange={(e)=>setPosition(e.target.value)}>
          <option value={[summoners[0].role,summoners[0].summonerName]}>{`${summoners[0].summonerName}`}</option>
          <option value={[summoners[1].role,summoners[1].summonerName]}>{`${summoners[1].summonerName}`}</option>
          <option value={[summoners[2].role,summoners[2].summonerName]}>{`${summoners[2].summonerName}`}</option>
          <option value={[summoners[3].role,summoners[3].summonerName]}>{`${summoners[3].summonerName}`}</option>
          <option value={[summoners[4].role,summoners[4].summonerName]}>{`${summoners[4].summonerName}`}</option>
        </select>
        <select className='position-selection' value={position} onChange={e=>setPosition(e.target.value)}>
          <option value={'TOP'}>{'TOP'}</option>
          <option value={'JUNGLE'}>{'JUNGLE'}</option>
          <option value={'MIDDLE'}>{'MIDDLE'}</option>
          <option value={'BOTTOM'}>{'BOTTOM'}</option>
          <option value={'SUPPORT'}>{'SUPPORT'}</option>
        </select>
      </div>
    )  
}
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
  const [draft,setDraft] = useState<DraftList>(props.draft)
  
  const summoners:Summoner[] = [
    {name:'Fish',role:'TOP',champ:'',icon:''},
    {name:'Ouken',role:'JUNGLE',champ:'',icon:'null'},
    {name:'HappyBlueGuy',role:'MIDDLE',champ:'',icon:''},
    {name:'Envoker',role:'BOTTOM',champ:'',icon:''},
    {name:'adc',role:'SUPPORT',champ:'',icon:''}
  ]
  /*
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
    })*/
    
    const ChampAssignments = () => {
      const handleSelection = (e:any) => {
        setPosition(e.target.value[0])
        const newDraft = {...props.draft}
        //look for the index somehow
        newDraft.bluePicks[0].role = e.target.value[0]
        newDraft.bluePicks[0].name = e.target.value[1]
        newDraft.bluePicks[0].champ = props.champion 
      }

      return(
        <div className="champ-assignments">
          <select className='summoner-selection' onChange={(e)=>handleSelection(e.target.value)}>
            <option value={[summoners[0].role,summoners[0].name]}>{`${summoners[0].name}`}</option>
            <option value={[summoners[1].role,summoners[1].name]}>{`${summoners[1].name}`}</option>
            <option value={[summoners[2].role,summoners[2].name]}>{`${summoners[2].name}`}</option>
            <option value={[summoners[3].role,summoners[3].name]}>{`${summoners[3].name}`}</option>
            <option value={[summoners[4].role,summoners[4].name]}>{`${summoners[4].name}`}</option>
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
    
    return(
      <div className="end-draft-container">
        <div className="end-draft">
          {draft.bluePicks.map((summoner)=>{
            return(
              <div className="role-select">
                <img className='assignemnt-champ-icon' src={summoner.icon}/>
                <ChampAssignments/>
              </div>
            )})}
          <input type="button" value={'CONFIRM DRAFT'}/>
          <input type="button" value={'RESET'}/>
        </div>
      </div>
    )  
}
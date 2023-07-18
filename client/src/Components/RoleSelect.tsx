import { useState } from "react"
import { Summoner } from "../App/Types/champ-select-types"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { DraftList } from "../App/Types/champ-select-types"
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl"

///props will have to be the champion name so include it inside the summoner Div somewhere
///embed this in the pick div and 
///somehow have the div pass the champ name to this and give it the ability to update the draft

/*

export const RoleSelect = (props:{champion:string,draft:DraftList}) => {
  const [draft,setDraft] = useState<DraftList>(props.draft)
  
  //maybe instead of calling this interface summoner call it something else
  
  const summoners:PositionSelect[] = [
    {name:'Fish',role:'TOP',champion:null},
    {name:'Ouken',role:'JUNGLE',champion:null},
    {name:'HappyBlueGuy',role:'MIDDLE',champion:null},
    {name:'Envoker',role:'BOTTOM',champion:null},
    {name:'adc',role:'SUPPORT',champion:null},
]
  const draftlist:Summoner[] = [
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
    })
  ///feed each summoner into their own component  
    const ChampAssignments = () => {
      //make red for redside
      const [player,setPlayer] = useState(draft.bluePicks.)
      
      const handleSummonerSelection = (name:string) => {
        const newDraft = {...props.draft}
        //if statements for side
        const index = summoners.findIndex(summoner=>{return summoner.name === name})
        newDraft.bluePicks[index].name = name 
        setDraft(newDraft)
        console.log(draft.bluePicks[index].name)
      }

      const handleRoleSelection = (role:string) => {
        const newDraft = {...props.draft}
        //if statements for side
        const index = draft.bluePicks.findIndex(summoner=>{return summoner.role === role})
        newDraft.bluePicks[index].role = role 
        setDraft(newDraft)
      }

      //these get the summoners from the summoners array need to update the draftlist somehow
      return(
        <div className="champ-assignments">
          <select className='summoner-selection' value={} onChange={(e)=>handleSummonerSelection(e.target.value)}>
            {summoners.map((summoner)=>{
              return(<option value={summoner.name}>{summoner.name}</option>)
              })}
          </select>
          <select className='position-selection' onChange={e=>handleRoleSelection(e.target.value)}>
          {summoners.map((summoner)=>{
              return(<option value={summoner.role}>{summoner.role}</option>)
              })}
          </select>
        </div>
      )
    }
    so the actual model for the summoners will not have the names it will just have the champ/icon
    the names will come from somewhere else and will be assigned here
    
    return(
      <div className="end-draft-container">
        <div className="end-draft">
          {draft.bluePicks.map((summoner)=>{
            //const champ = summoner.champ
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

*/

export const RoleSelect = (props:{champion:string, draft:DraftList}) => {
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

  //MAKE SEPARATE COMMPONENT 
  //THIS IS BLUE SIDE ONLY
  const ChampAssignments = (props:{champName:string}) => {
    const [player,setPlayer] = useState('Fish')
    
    const handleSummonerSelection = (name:string) => {
      //this does not seem to set the player
      setPlayer(name);
      console.log(player)
      debugger;

      if (draft!==null){
        const newDraft = {...draft}
        
        const summonerIndex = draft.players.findIndex((summoner)=>{return summoner.name === name})
        const summoner = draft.players[summonerIndex]

        const pickIndex = draft.bluePicks.findIndex(pick=>{return pick.champ === props.champName})
        
        newDraft.bluePicks[pickIndex].summoner = summoner

        setDraft(newDraft)
        console.log(player)
      }
    }

  //how do I make these show the currently selected value?  
  return(
    <div className="champ-assignments">
      <select className='summoner-selection' value={player} onChange={(e)=>{handleSummonerSelection(e.target.value)}}>
        {draft.players.map((summoner)=>{
          return(<option key={summoner.name} value={summoner.name}>{summoner.name}</option>)
          })}
      </select>
      <select className='position-selection' onChange={e=>(e.target.value)}>
      {draft.players.map((summoner)=>{
          return(<option key={summoner.role} value={summoner.role}>{summoner.role}</option>)
          })}
      </select>
    </div>
  )
  }
    return(
      <div className="end-draft-container">
        <div className="end-draft">
          {draft.bluePicks.map((pick)=>{
            return(
              <div key={pick.champ} className="role-select">
                <img className='assignemnt-champ-icon' src={pick.icon}/>
                <ChampAssignments champName={pick.champ}/>
              </div>
            )})}
          <input type="button" value={'CONFIRM DRAFT'}/>
          <input type="button" value={'RESET'}/>
        </div>
      </div>
    )  
}
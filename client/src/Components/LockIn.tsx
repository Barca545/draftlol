import { useState,useEffect } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl";
import { DraftList,isDraft } from "../App/Types/champ-select-types";
import { RoleSelect } from "./RoleSelect";
import { Timer } from "../App/Types/champ-select-types";
import { LockButton } from "./LockButton";

export const LockIn = (props:{selection:string[],draft:DraftList, side:'Blue'|'Red'|'Done'}) => {
  const [show,setShow] = useState(false)
  const [confirmedDraft, setConfirmedDraft] = useState(false)
  const [time, setTime] = useState<Timer|null>(null)

  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/timer`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let timer:Timer = JSON.parse(message.data)
      setTime(timer)
    },
    share:false, 
    retryOnError: true,
    shouldReconnect: () => true
  })
  
  //this seems to be able to tap into the websocket for the timer. 
  //Have this one also handle the reset on turn change
  //just need to make it so if can execute the handle reset
  useEffect(() => {
    if(time?.seconds===0){console.log('confirmed time is 0')}
  },[time])

    if (isDraft(props.draft)) {
      if(props.draft.turn!=='Done'){
        return(
          <LockButton draft={props.draft} selection={props.selection}/>
        )
      }
      else{ 
        if(show===true&&confirmedDraft===false){
          return(
            <div>
              <RoleSelect onClose={()=>{setShow(false);setConfirmedDraft(true)}} show={show} side={props.side} draft={props.draft}/>
            </div>
          )
        }
        else if (confirmedDraft===true) {return(<></>)}
        else{
          return(
            <input className="lock-button" value={'FINISH'} type="button" onClick={()=>setShow(true)}/>
          )
        }
      }
    }
    else {
      return(
        <input className="lock-button" value={'LOCK IN'} type="button"/>
      )
    }  
}
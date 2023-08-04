import { useState,useEffect } from "react";
import { DraftList,isDraft } from "../App/Types/champ-select-types";
import { RoleSelect } from "./RoleSelect";
import { Timer } from "../App/Types/champ-select-types";
import { LockButton } from "./LockButton";
import { SendMessage } from 'react-use-websocket'

export const LockIn = (props:{selection:string[],draft:DraftList, side:'Blue'|'Red'|'Done', updateDraft:SendMessage}) => {
  const [show,setShow] = useState(false)
  const [confirmedDraft, setConfirmedDraft] = useState(false)
  const [time, setTime] = useState<Timer|null>(null)

  //have this + the oppos
  /*
  useEffect(() => {
    sendMessage(JSON.stringify({seconds:60}))
  },[])*/
 
//THIS SHOULD SET THE DRAFT AND ALTER TURN NUMBER BY +1 WHEN TIME===0
/*
  useEffect(() => {
    if(time?.seconds===50){confirmDraft()}
  },[time])
*/

  if (isDraft(props.draft)) {
    if(props.draft.turn!=='Done'){
      return(
        <LockButton draft={props.draft} selection={props.selection} updateDraft={props.updateDraft}/>
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
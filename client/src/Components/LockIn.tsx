import { useState} from "react";
import { DraftList,isDraft } from "../App/Types/champ-select-types";
import { RoleSelect } from "./RoleSelect";
import { LockButton } from "./LockButton";
import { SendMessage } from 'react-use-websocket'

export const LockIn = (props:{selection:string[],draft:DraftList, id:string, side:'Blue'|'Red'|'Done', updateDraft:SendMessage}) => {
  const [show,setShow] = useState(false)
  const [confirmedDraft, setConfirmedDraft] = useState(false)

  if (isDraft(props.draft)) {
    if(props.draft.turn!=='Done'){
      return(
        <LockButton id={props.id} draft={props.draft} selection={props.selection} updateDraft={props.updateDraft}/>
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
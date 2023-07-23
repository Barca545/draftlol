import { useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl";
import { DraftList,isDraft } from "../App/Types/champ-select-types";
import { RoleSelect } from "./RoleSelect";

export const LockIn = (props:{selection:string[],draft:DraftList, side:'Blue'|'Red'|'Done'}) => {
  const [show,setShow] = useState(false)
  const [confirmedDraft, setConfirmedDraft] = useState(false)

  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
      onOpen: () => console.log('connection opened'),
      onClose: () => console.log('connection closed'),
      share:true, 
      retryOnError: true,
      shouldReconnect: () => true
      })

  const handleConfirm = () => {
      ///needs to increment pick index
      if (isDraft(props.draft)){
        const newDraft:DraftList = {...props.draft,
          champList:[...props.draft.champList.filter((item)=>item[0]!==props.selection[0])],
          topList: [...props.draft.topList.filter((item)=>item[0]!==props.selection[0])],
          jgList:[...props.draft.jgList.filter((item)=>item[0]!==props.selection[0])],
          midList:[...props.draft.midList.filter((item)=>item[0]!==props.selection[0])],
          bottomList:[...props.draft.bottomList.filter((item)=>item[0]!==props.selection[0])],
          supportList:[...props.draft.supportList.filter((item)=>item[0]!==props.selection[0])]
        }
        //there is a disconnect between this and the handleSelect
        switch(props.draft.turnNumber) {
          case 0: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 1: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 2: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 3: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 4: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 5: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 6: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 7: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 8: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 9: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 10: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 11: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 12: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 13: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 14: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 15: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 16: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 17: {
            newDraft.turn = 'Blue'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          //turn 18 should be red but is toggling the last blueban
          case 18: {
            newDraft.turn = 'Red'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
          case 19: {
            newDraft.turn = 'Done'
            newDraft.turnNumber = props.draft.turnNumber+1
            break
          }
        }
        //setOutgoingDraft(newDraft)
        console.log(newDraft)
        sendMessage(JSON.stringify(newDraft))
        
      }
    }

    if (isDraft(props.draft)) {
      if(props.draft.turn!=='Done'){
        return(
          <input className="lock-button" value={'LOCK IN'} type="button" onClick={()=>handleConfirm()}/>
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
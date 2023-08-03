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

  useWebSocket(`${BASE_URL}/${MATCH_ID}/timer`, {
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

  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    share:true, 
    retryOnError: true,
    shouldReconnect: () => true
  })

  //have this + the oppos
  /*
  useEffect(() => {
    sendMessage(JSON.stringify({seconds:60}))
  },[])*/
  
  //THIS SHOULD SET THE DRAFT AND ALTER TURN NUMBER BY +1 WHEN TIME===0
/*
  useEffect(() => {
    const confirmDraft = () =>{
      const newDraft:DraftList = {...props.draft,
        champList:[...props.draft.champList.filter((item)=>item[0]!==props.selection[0])],
        topList: [...props.draft.topList.filter((item)=>item[0]!==props.selection[0])],
        jgList:[...props.draft.jgList.filter((item)=>item[0]!==props.selection[0])],
        midList:[...props.draft.midList.filter((item)=>item[0]!==props.selection[0])],
        bottomList:[...props.draft.bottomList.filter((item)=>item[0]!==props.selection[0])],
        supportList:[...props.draft.supportList.filter((item)=>item[0]!==props.selection[0])]
      }
      if (props.draft.turnNumber<=19){
        switch(newDraft.turn){
          case 'Blue': {
            newDraft.turn = 'Red'
            newDraft.turnNumber += 1
            console.log(newDraft)
            sendMessage(JSON.stringify(newDraft))
            break
          }
          case 'Red': {
            newDraft.turn = 'Blue'
            newDraft.turnNumber += 1
            console.log(newDraft)
            sendMessage(JSON.stringify(newDraft))
            break
          }
        }
      }
      else{
        newDraft.turn = 'Done'
        console.log(newDraft)
      }
    }
    if(time?.seconds===50){confirmDraft()}
  },[time])
*/
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
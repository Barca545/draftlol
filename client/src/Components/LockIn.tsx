import { useState } from "react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl";
import { DraftList,isDraft } from "../App/Types/champ-select-types";
import { RoleSelect } from "./RoleSelect";

///pass in selection as a prop
export const LockIn = (props:{selection:string[]|null,draft:DraftList}) => {
  const [draft, setDraft] = useState<DraftList>(props.draft)
  const [outgoingDraft, setOutgoingDraft] = useState<DraftList|null>(null)
  const [show,setShow] = useState(false)
  const selection = props.selection
  
  
  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
      onOpen: () => console.log('connection opened'),
      onClose: () => console.log('connection closed'),
      share:true, 
      retryOnError: true,
      shouldReconnect: () => true
      })


  const handleConfirm = () => {
      ///needs to increment pick index
      if (isDraft(draft) && selection!==null){
        const newDraft:DraftList = {...draft,
          turnNumber: draft.turnNumber+1,
          champList:[...draft.champList.filter((item)=>item[0]!==selection[0])],
          topList: [...draft.topList.filter((item)=>item[0]!==selection[0])],
          jgList:[...draft.jgList.filter((item)=>item[0]!==selection[0])],
          midList:[...draft.midList.filter((item)=>item[0]!==selection[0])],
          bottomList:[...draft.bottomList.filter((item)=>item[0]!==selection[0])],
          supportList:[...draft.supportList.filter((item)=>item[0]!==selection[0])]
        }
        switch(draft.turnNumber) {
          case 0: {
            newDraft.turn = 'Red'
            break
          }
          case 1: {
            newDraft.turn = 'Blue'
            break
          }
          case 2: {
            newDraft.turn = 'Red'
            break
          }
          case 3: {
            newDraft.turn = 'Blue'
            break
          }
          case 4: {
            newDraft.turn = 'Red'
            break
          }
          case 5: {
            newDraft.turn = 'Blue'
            break
          }
          case 6: {
            newDraft.turn = 'Red'
            break
          }
          case 7: {
            newDraft.turn = 'Red'
            break
          }
          case 8: {
            newDraft.turn = 'Blue'
            break
          }
          case 9: {
            newDraft.turn = 'Blue'
            break
          }
          case 10: {
            newDraft.turn = 'Red'
            break
          }
          case 11: {
            newDraft.turn = 'Red'
            break
          }
          case 12: {
            newDraft.turn = 'Blue'
            break
          }
          case 13: {
            newDraft.turn = 'Red'
            break
          }
          case 14: {
            newDraft.turn = 'Blue'
            break
          }
          case 15: {
            newDraft.turn = 'Red'
            break
          }
          case 16: {
            newDraft.turn = 'Blue'
            break
          }
          case 17: {
            newDraft.turn = 'Blue'
            break
          }
          case 18: {
            newDraft.turn = 'Done'
            break
          }
        }
        setOutgoingDraft(newDraft)
        sendMessage(JSON.stringify(outgoingDraft))
      }
    }

    if (isDraft(draft)) {
      if(draft.turn!=='Done'){
        return(
          <input className="lock-button" value={'LOCK IN'} type="button" onClick={()=>handleConfirm()}/>
        )
      }
      else{ 
        ///bind the show role select to the onclick here
        if(show===true){
          return(
            <div>
              <input className="lock-button" value={'FINISH'} type="button" onClick={()=>setShow(!show)}/>
              <RoleSelect champion="test" draft={draft}/>
            </div>
          )
        }
        else{
          return(
            <input className="lock-button" value={'DONE'} type="button" onClick={()=>setShow(!show)}/>
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
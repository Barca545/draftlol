import { DraftList,isDraft } from "../App/Types/champ-select-types";
import { SendMessage } from 'react-use-websocket'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl";
import { useState, useEffect} from "react";
import { Timer } from "../App/Types/champ-select-types";

export const LockButton = (props:{draft:DraftList,selection:string[],updateDraft:SendMessage}) => {
  const [time, setTime] = useState<Timer|null>(null)

  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/timer`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let timer:Timer = JSON.parse(message.data)
      setTime(timer)
    },
    share:true, 
    retryOnError: true,
    shouldReconnect: () => true
  })

  useEffect(()=>{
    if (time?.seconds===0){handleLock()}
  },[time])

  const handleLock = () => {
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
      props.updateDraft(JSON.stringify(newDraft))
      sendMessage(JSON.stringify({seconds:60}))
    }
  }

  return (
    <input className="lock-button" value={'LOCK IN'} type="button" onClick={()=>handleLock()}/>
  )
}
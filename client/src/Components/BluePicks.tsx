import { isDraft,DraftList } from "../App/Types/champ-select-types"
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { useState } from "react"

export const BluePicks = () => {
  const [draft, setDraft] = useState<DraftList|null>(null)
  
  useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
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
  
  if (isDraft(draft)) {
    return(
      <div className="blue-picks">
        <div className='summoner'>
          <img className='champselect-image' src={draft.bluePicks[0].icon} alt=''/>
        </div>
        <div className='summoner'>
          <img className='champselect-image' src={draft.bluePicks[1].icon} alt=''/>
        </div>
        <div className='summoner'>
          <img className='champselect-image' src={draft.bluePicks[2].icon} alt=''/>
        </div>
        <div className='summoner'>
          <img className='champselect-image' src={draft.bluePicks[3].icon} alt=''/>   
        </div>
        <div className='summoner'>
          <img className='champselect-image' src={draft.bluePicks[4].icon} alt=''/>
        </div>
      </div>
      )
    }
    else{
      return(<></>)
    }
  }
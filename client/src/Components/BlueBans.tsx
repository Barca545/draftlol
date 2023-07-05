import { isDraft,DraftList } from "../App/Types/champ-select-types"
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl"
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { useState } from "react"

export const BlueBans = () => {
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
        <div className='blue-bans'>
            <img className='ban-image' src={draft.blueBans[0].icon} alt=''/>
            <img className='ban-image' src={draft.blueBans[1].icon} alt=''/>
            <img className='ban-image' src={draft.blueBans[2].icon} alt=''/>
            <img className='ban-image' src={draft.blueBans[3].icon} alt=''/>
            <img className='ban-image' src={draft.blueBans[4].icon} alt=''/>
        </div>
      )
    }
    else {return(<></>)}
  }
import { BlueBans } from "../Components/BlueBans";
import { BluePicks } from "../Components/BluePicks";
import { RedPicks } from "../Components/RedPicks";
import { RedBans } from '../Components/RedBans'
import { ChampSelect } from "../Components/ChampSelect";
import { CountdownTimer } from "../Components/CountdownTimer";
import { TeamBanner } from "../Components/team-banner";
import '../Styles/draft-styles.scss'
import { useState } from "react"
import { DraftList } from "../App/Types/champ-select-types";
import { BASE_URL,MATCH_ID } from "../App/Slices/baseurl";
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { initialDraftList } from "../Components/initialStates/initialDraftList";

export const RedDraft = (props:{id:string}) => {
  const [draft, setDraft] = useState<DraftList>(initialDraftList)
  
  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/redside`, {
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

    return(
      <div className="draft-container">
        <div className="draft-container-header">
          <CountdownTimer draftlist={draft}/>
          <TeamBanner side={'blue'}/>
          <TeamBanner side={'red'}/>
        </div>
        <ChampSelect side={'Red'} opposite={'Blue'} draft={draft} updateDraft={sendMessage}/>
        <BluePicks draft={draft}/>
        <RedPicks draft={draft}/>
        <BlueBans draft={draft}/>
        <RedBans draft={draft}/>
      </div>
    )
  }

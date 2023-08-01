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
import { initalAllChamps } from "../Components/initialStates/initalAllChamps";
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { initialDraftList } from "../Components/initialStates/initialDraftList";

export const RedDraft = () => {
  const [draft, setDraft] = useState<DraftList>(initialDraftList)
  const [champList,setChampList] = useState(initalAllChamps)
  
  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let data:DraftList = JSON.parse(message.data)
      setDraft(data)
      setChampList(data.champList)
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
        <ChampSelect side={'Red'} opposite={'Blue'}/>
        <BluePicks/>
        <RedPicks/>
        <BlueBans/>
        <RedBans/>
      </div>
    )
  }

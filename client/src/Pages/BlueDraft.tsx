import { BlueBans } from "../Components/BlueBans";
import { BluePicks } from "../Components/BluePicks";
import { RedPicks } from "../Components/RedPicks";
import { RedBans } from '../Components/RedBans'
import { ChampSelect } from "../Components/ChampSelect";
import { CountdownTimer } from "../Components/CountdownTimer";
import { TeamBanner } from "../Components/team-banner";
import '../Styles/draft-styles.scss'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { useState,useEffect} from 'react'
import { DraftList } from "../App/Types/champ-select-types";
import { BASE_URL} from "../App/Slices/baseurl";
import { initialDraftList } from "../Components/initialStates/initialDraftList";
import { io } from "socket.io-client";


export const BlueDraft = (props:{id:string}) => {
  const [draft, setDraft] = useState<DraftList>(initialDraftList)
  
  const socket = io(`${BASE_URL}`,{
    autoConnect: true,
    query:{
      gameid: `${props.id}`
    }
  });

  const [isConnected, setIsConnected] = useState(socket.connected);

  const sendMessage = () => { 
    socket.emit('test')
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      console.log('connection opened')
    }

    function onDisconnect() {
      setIsConnected(false)
      console.log('connection closed')
    }
    
    socket.on('connect', ()=> onConnect());
    socket.on('disconnect', () => onDisconnect());
    //socket.on('message', ()=> console.log('message recieved'));

    return () => {
      socket.off('connect', ()=> onConnect());
      socket.off('disconnect', () => onDisconnect());
      //socket.off('message', ()=> console.log('message recieved'));
    };
  }, []);
  
  
  
  return(
    <div className="draft-container">
      <div className="draft-container-header">
        {/*<CountdownTimer draftlist={draft} id={props.id}/>*/}
        <TeamBanner side={'blue'}/>
        <TeamBanner side={'red'}/>
      </div>
      {/*<ChampSelect id={props.id} side={'Blue'} opposite={'Red'} draft={draft} updateDraft={sendMessage}/>*/}
      <BluePicks draft={draft}/>
      <RedPicks draft={draft}/>
      <BlueBans draft={draft}/>
      <RedBans draft={draft}/>
    </div>
  )
}
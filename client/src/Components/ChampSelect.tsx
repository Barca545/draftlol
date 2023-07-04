import {useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL,MATCH_ID } from '../App/Slices/baseurl'
import { DraftList,ChampSelection } from '../App/Types/champ-select-types'
import '../Styles/champ-select-styles.css'

export const ChampSelect = () => {
  const [draft, setDraft] = useState<DraftList|null>(null)
  const [selection, setSelection] = useState<null|ChampSelection>()

  const {sendMessage,readyState} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let data:DraftList = JSON.parse(message.data)
      setDraft(data)
      console.log(draft)
    },
    share:false, ///maybe share should be false
    retryOnError: true,
    shouldReconnect: () => true
    })
  
  
  const ChampList = () => {
    if (draft!==null) {
      return(
        <div className='champ-list'>
          {draft.champList.map((item)=>{
            return(
              <div 
                className='champion' 
                key={item[0]} id={item[0]}>
                <img src={item[1]} alt=''
                onClick={()=>setSelection({name:item[0],icon:item[1]})}/>
              </div>)}
            )
          }
        </div>)
    }
    else {return(<></>)}
  }
  
  const BlueBans = () => {
    if (draft!==null) {
      return(
        <div className='blue-side-bans'>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBanlist[0].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBanlist[1].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBanlist[2].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBanlist[3].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBanlist[4].icon} alt=''/>
          </span>
        </div>
      )
    }
    else {return(<></>)}
  }

  const RedBans = () => {
    if (draft!==null) {
      return(
        <div className='red-side-bans'>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[0].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBanlist[1].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[2].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[3].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[4].icon} alt=''/>
          </span>
        </div>
      )
    }
    else {return(<></>)}
  }
  
  if (draft!==null)  {
    return (
      <div>
        <ChampList/>
        <BlueBans/>
        <RedBans/>
      </div>
    )  
  }
  else {
    return (<></>)}
}
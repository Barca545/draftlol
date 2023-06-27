import { useEffect, useState } from 'react'
import '../Pages/draft-styles.css'
import { champlist } from './temp-champ-list'
import { DraftList} from '../App/Types/champ-select-types'
import { useAppDispatch,useAppSelector } from '../App/hooks'
import {getBlueDraftState, setBlueBans, setBlueSummoners} from '../App/Slices/blueDraftSlice'
import { BASE_URL } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { ReadyState } from 'react-use-websocket'
import { WebSocketMessage } from 'react-use-websocket/dist/lib/types'

/*
- may not even need Redux for this app
- need to add a timer
- need to add a thing to the champion list that prevents champs that have been picked/baned from being selected
- why does it reset the draft on reconnect
  - new draft initial state needs to come from the server
*/

export const BlueDraft = () => {
  ///configure to use wss instead of ws
  const {sendMessage, lastMessage, readyState} = useWebSocket(BASE_URL, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      const response:DraftList = JSON.parse(message.data);
      setNewDraft(response)
      ///why is this logging two times
      ///console.log(newDraft)
    },
    share:true, ///maybe share should be false
    retryOnError: true,
    shouldReconnect: () => true
  })
  
  const [newDraft, setNewDraft] = useState<DraftList>(useAppSelector(getBlueDraftState))
  const [outgoingDraft, setOutgoingDraft] = useState(newDraft)

  const [pickIndex,setPickIndex] = useState(0)
  const [banIndex,setBanIndex] = useState(0)
  const [banPhase,setBanPhase] = useState(true)
  const [blueTurn, setBlueTurn] = useState(true)
  
  useEffect(()=>{
    if (banIndex === 3 && pickIndex < 3 ){setBanPhase(false)}
    else if (banIndex === 3 && pickIndex == 3 ){setBanPhase(true)}
    else if (banIndex === 5 && pickIndex == 3 ){setBanPhase(false)}
    
    if (readyState === ReadyState.OPEN) {    
      ///need to make sure to update the blueturn state before sending
      sendMessage(JSON.stringify(outgoingDraft))
    }
    ///do I want sendMessage in the dependencies
  },[blueTurn, sendMessage, readyState, outgoingDraft])


  const handleChampSelect = (item:string[]) => {
    let draft = {
      blueBanlist: [...newDraft.blueBanlist],
      blueSummonerlist: [...newDraft.blueSummonerlist],
      redBanlist: [...newDraft.redBanlist],
      redSummonerlist: [...newDraft.redSummonerlist],
      blueTurn: blueTurn
    }

    if (banPhase==false) {
      draft.blueSummonerlist[pickIndex] = {name: '',champ:item[0],icon:item[1]}
      setOutgoingDraft(draft)

    }
    else if (banPhase==true){
      draft.blueBanlist[banIndex] = {champ:item[0],icon:item[1]}
      setOutgoingDraft(draft)
    }
  }

  const handleConfirm = () => {
    if (banPhase == false){
      if (newDraft.blueSummonerlist[pickIndex].name != null) {
        setPickIndex(pickIndex+1)
        setBlueTurn(!blueTurn)
        console.log(outgoingDraft)
      }
    }
    else {
      if (newDraft.blueBanlist[banIndex].champ != null) {
        setBanIndex(banIndex+1)
        setBlueTurn(!blueTurn)
        console.log(outgoingDraft)
      }
    }
  }

  const ChampList = () => {
    return(
      <div className='champ-list'>
        {champlist.map((item)=>{
          if (blueTurn===true){
            return(
              <div className='champion' key={item[0]} id={item[0]} onClick={()=>handleChampSelect(item)}>
                <img src={item[1]} alt=''/>
              </div>
            )
          }
          else {
            return(
              <div className='champion' key={item[0]} id={item[0]}>
                <img src={item[1]} alt=''/>
              </div>
            )
          }
        })}
      </div>
    )
  }
  
  return( 
    <div className="grid-container">
      <div className='lane-select'>
       <input type='button' value={'TOP'}/>
       <input type='button' value={'JUNGLE'}/>
       <input type='button' value={'MIDDLE'}/>
       <input type='button' value={'BOTTOM  '}/>
       <input type='button' value={'SUPPORT'}/>
       <input type='text' placeholder='Find Champion...'/>
      </div>
      <div className="blue-side">
        <div className='blue-summoner-1'>
          <img className='champselect-image' src={newDraft.blueSummonerlist[0].icon} alt=''/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-jg'>Jungle</option>
              <option value='blue-mid'>Middle</option>
              <option value='blue-adc'>Bottom</option>
              <option value='blue-sup'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-2'>
          <img className='champselect-image' src={newDraft.blueSummonerlist[1].icon} alt=''/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-jg'>Jungle</option>
              <option value='blue-mid'>Middle</option>
              <option value='blue-adc'>Bottom</option>
              <option value='blue-sup'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-3'>
          <img className='champselect-image' src={newDraft.blueSummonerlist[2].icon} alt=''/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-jg'>Jungle</option>
              <option value='blue-mid'>Middle</option>
              <option value='blue-adc'>Bottom</option>
              <option value='blue-sup'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-4'>
          <img className='champselect-image' src={newDraft.blueSummonerlist[3].icon} alt=''/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-jg'>Jungle</option>
              <option value='blue-mid'>Middle</option>
              <option value='blue-adc'>Bottom</option>
              <option value='blue-sup'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-5'>
          <img className='champselect-image' src={newDraft.blueSummonerlist[4].icon} alt=''/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-jg'>Jungle</option>
              <option value='blue-mid'>Middle</option>
              <option value='blue-adc'>Bottom</option>
              <option value='blue-sup'>Support</option>
            </select>
          </div>
        </div>
      </div>
      <div className="champ-select">
        <ChampList/>
      </div>
      <div className="red-side">
        <div className='red-summoner-1'>
          <img className='champselect-image' src={newDraft.redSummonerlist[0].icon} alt=''/>
        </div>
        <div className='red-summoner-2'>
          <img className='champselect-image' src={newDraft.redSummonerlist[1].icon} alt=''/>
        </div>
        <div className='red-summoner-3'>
          <img className='champselect-image' src={newDraft.redSummonerlist[2].icon} alt=''/>
        </div>
        <div className='red-summoner-4'>
        <img className='champselect-image' src={newDraft.redSummonerlist[3].icon} alt=''/>   
        </div>
        <div className='red-summoner-5'>
          <img className='champselect-image' src={newDraft.redSummonerlist[4].icon} alt=''/>
        </div>
      </div>
      <div className='blue-side-bans'>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.blueBanlist[0].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.blueBanlist[1].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.blueBanlist[2].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.blueBanlist[3].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.blueBanlist[4].icon} alt=''/>
        </span>
      </div>
      <div className='red-side-bans'>
      <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.redBanlist[4].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.redBanlist[3].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.redBanlist[2].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.redBanlist[1].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={newDraft.redBanlist[0].icon} alt=''/>
        </span>
      </div>
      <div className='lock-button'>
        <input className='confirm-button' type='button' value={'confirm'} onClick={()=>handleConfirm()}/>
      </div>
    </div>
  )
}
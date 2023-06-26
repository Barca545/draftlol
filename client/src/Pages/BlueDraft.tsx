import { useEffect, useState } from 'react'
import '../Pages/draft-styles.css'
import { champlist } from './temp-champ-list'
import { DraftList, Ban, Summoner} from '../App/Types/champ-select-types'
import { useAppDispatch,useAppSelector } from '../App/hooks'
import {getBlueDraftState, setBlueBans, setBlueSummoners} from '../App/Slices/blueDraftSlice'
import { getRedDraftState } from '../App/Slices/redDraftSlice'
import { BASE_URL } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { ReadyState } from 'react-use-websocket'
import { WebSocketMessage } from 'react-use-websocket/dist/lib/types'

/*
-may not even need Redux for this app
- three links (draft captains + spectator) \
- somehow I made a fucking memory leak so fix that. might be in handle champ select?

- need to add a thing to the champion list that prevents champs that have been picked/baned from being selected

- on confirm needs to update store and togle BlueTurn
- Blue should be locked out unless BlueTurn is true
- mousing over needs to send an updated list to the server 
- something in the JSON is going wrong and causing redside to render blueside delayed by one message
*/

export const BlueDraft = () => {
  ///configure to use wss instead of ws
  const dispatch = useAppDispatch()
  const {sendMessage, lastMessage, readyState} = useWebSocket(BASE_URL, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    /*shouldReconnect: (closeEvent) => true,
    onMessage: (event:WebSocketEventMap['message']) => (event: { data: string; }) => {
      const response:DraftList = JSON.parse(event.data);
    }*/
    share:true,
    retryOnError: true,
    shouldReconnect: () => true
  })
  
  const [blueSummonerList, setBlueSummonerList] = useState(useAppSelector(getBlueDraftState).blueSummonerlist)
  const [blueBanList, setBlueBanList] = useState(useAppSelector(getBlueDraftState).blueBanlist)
  const [redSummonerList,setRedSummonerList] = useState(useAppSelector(getRedDraftState).redSummonerlist)
  const [redBanList,setRedBanList] = useState(useAppSelector(getRedDraftState).redBanlist)
  
  const [pickIndex,setPickIndex] = useState(0)
  const [banIndex,setBanIndex] = useState(0)
  const [banPhase,setBanPhase] = useState(true)
  const [blueTurn, setBlueTurn] = useState(true)

  useEffect(()=>{
    if (banIndex === 3 && pickIndex < 3 ){setBanPhase(false)}
    else if (banIndex === 3 && pickIndex == 3 ){setBanPhase(true)}
    else if (banIndex === 5 && pickIndex == 3 ){setBanPhase(false)}
    
    if (readyState === ReadyState.OPEN) {    
      if (lastMessage != undefined) {
        let draftList:DraftList = JSON.parse(lastMessage?.data)
        const enemySummonerList:Summoner[] = draftList.redSummonerlist
        const enemyBanList:Ban[] = draftList.redBanlist
        setRedSummonerList(enemySummonerList)
        setRedBanList(enemyBanList)
      }
      let draftList:DraftList = {
        blueBanlist: blueBanList,
        blueSummonerlist: blueSummonerList,
        redBanlist: redBanList,
        redSummonerlist: redSummonerList,
        blueTurn: blueTurn
      }
      const draftListString = JSON.stringify(draftList)
      sendMessage(draftListString)
    }
    ///do I want sendMessage in the dependencies
  },[blueTurn,sendMessage, readyState])


  const handleChampSelect = (item:string[]) => {
    let templist = {
      blueBanList: [...blueBanList],
      blueSummonerList: [...blueSummonerList],
      blueTurn: blueTurn
    }
    if (banPhase==false) {
      templist.blueSummonerList[pickIndex] = {name: '',champ:item[0],icon:item[1]}
      setBlueSummonerList(templist.blueSummonerList)

    }
    else if (banPhase==true){
      templist.blueBanList[banIndex]= {champ:item[0],icon:item[1]}
      setBlueBanList(templist.blueBanList)
    }
  }

  const handleConfirm = () => {
    if (banPhase == false){
      if (blueSummonerList[pickIndex].name != null) {
        setPickIndex(pickIndex+1)
        setBlueTurn(!blueTurn)
        dispatch(setBlueSummoners(blueSummonerList))
      }
    }
    else {
      if (blueBanList[banIndex].champ != null) {
        setBanIndex(banIndex+1)
        setBlueTurn(!blueTurn)}
        dispatch(setBlueBans(blueBanList))
    }
  }

  const ChampList = () => {
    return(
      <div className='champ-list'>
        {champlist.map((item)=>{
          return(
            <div className='champion' id={item[0]} onClick={()=>handleChampSelect(item)} aria-label=''>
              <img src={item[1]} alt=''/>
            </div>
          )})}
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
          <img className='champselect-image' src={blueSummonerList[0].icon} alt=''/>
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
          <img className='champselect-image' src={blueSummonerList[1].icon} alt=''/>
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
          <img className='champselect-image' src={blueSummonerList[2].icon} alt=''/>
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
          <img className='champselect-image' src={blueSummonerList[3].icon} alt=''/>
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
          <img className='champselect-image' src={blueSummonerList[4].icon} alt=''/>
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
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='red-top'>Top</option>
              <option value='red-jg'>Jungle</option>
              <option value='red-mid'>Middle</option>
              <option value='red-adc'>Bottom</option>
              <option value='red-sup'>Support</option>
            </select>
          </div>
          <img className='champselect-image' src={redSummonerList[0].icon} alt=''/>
        </div>
        <div className='red-summoner-2'>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='red-top'>Top</option>
              <option value='red-jg'>Jungle</option>
              <option value='red-mid'>Middle</option>
              <option value='red-adc'>Bottom</option>
              <option value='red-sup'>Support</option>
            </select>
          </div>
          <img className='champselect-image' src={redSummonerList[1].icon} alt=''/>
        </div>
        <div className='red-summoner-3'>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='red-top'>Top</option>
              <option value='red-jg'>Jungle</option>
              <option value='red-mid'>Middle</option>
              <option value='red-adc'>Bottom</option>
              <option value='red-sup'>Support</option>
            </select>
          </div>
          <img className='champselect-image' src={redSummonerList[2].icon} alt=''/>
        </div>
        <div className='red-summoner-4'>
        <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='red-top'>Top</option>
              <option value='red-jg'>Jungle</option>
              <option value='red-mid'>Middle</option>
              <option value='red-adc'>Bottom</option>
              <option value='red-sup'>Support</option>
            </select>
          </div>
        <img className='champselect-image' src={redSummonerList[3].icon} alt=''/>   
        </div>
        <div className='red-summoner-5'>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='red-top'>Top</option>
              <option value='red-jg'>Jungle</option>
              <option value='red-mid'>Middle</option>
              <option value='red-adc'>Bottom</option>
              <option value='red-sup'>Support</option>
            </select>
          </div>
          <img className='champselect-image' src={redSummonerList[4].icon} alt=''/>
        </div>
      </div>
      <div className='blue-side-bans'>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueBanList[0].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueBanList[1].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueBanList[2].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueBanList[3].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueBanList[4].icon} alt=''/>
        </span>
      </div>
      <div className='red-side-bans'>
      <span className='ban-image-wrapper'>
          <img className='ban-image' src={redBanList[4].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redBanList[3].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redBanList[2].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redBanList[1].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redBanList[0].icon} alt=''/>
        </span>
      </div>
      <div className='lock-button'>
        <input className='confirm-button' type='button' value={'confirm'} onClick={()=>handleConfirm()}/>
      </div>
    </div>
  )
}
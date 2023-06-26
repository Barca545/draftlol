import { useEffect, useState } from 'react'
import '../Pages/draft-styles.css'
import { champlist } from './temp-champ-list'
import { DraftList } from '../App/Types/champ-select-types'
import { useAppDispatch,useAppSelector } from '../App/hooks'
import {getBlueDraftState,setBlueDraft} from '../App/Slices/blueDraftSlice'
import { getRedDraftState } from '../App/Slices/redDraftSlice'
import { BASE_URL } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'

/*
need the champ select boxes to be constant size
lock in/confirm button
ban display
three links (draft captains + spectator) \
somehow I made a fucking memory leak so fix that. might be in handle champ select?

need to add a thing to the champion list that prevents champs that have been picked/baned from being selected

-on confirm should send the matchlist to the store and to the websocket
-
*/

export const BlueDraft = () => {
  ///Part of me thinks this should be sitting in a different file
  ///have to set the state of redlist equal to the response in onmessage
  ///configure to use wss instead of ws
  ///lastJSONMessage refuses to work for some reason
  const {lastMessage} = useWebSocket(BASE_URL, {
    ///shares connextion from app
    share: true,
    ///filter: isUserEvent
  })
  
  const [blueList, setBlueList] = useState(useAppSelector(getBlueDraftState))
  const [redlist,setRedlist] = useState(useAppSelector(getRedDraftState))
  
  const [pickIndex,setPickIndex] = useState(0)
  const [banIndex,setBanIndex] = useState(0)
  const [banPhase,setBanPhase] = useState(true)
  const [blueTurn, setBlueTurn] = useState(true)
  const dispatch = useAppDispatch()
  ///eventually use a websocket to control a turn bolean that disables all the buttons when off
  ///should only be able to do stuff when blue turn is true

  useEffect(()=>{
    if (banIndex === 3 && pickIndex < 3 ){setBanPhase(false)}
    else if (banIndex === 3 && pickIndex == 3 ){setBanPhase(true)}
    else if (banIndex === 5 && pickIndex == 3 ){setBanPhase(false)}
    ///this solves the problem with the JSON being undefined when it first loads
    ///however only triggers after the first champ is selected 
    
    if (lastMessage?.data != undefined) {    
      const list:DraftList = JSON.parse(lastMessage?.data)
      setRedlist(list)
    }

  },[blueTurn])


  const handleChampSelect = (item:string[]) => {
    let templist:DraftList = {
      banlist: [...blueList.banlist],
      summonerlist: [...blueList.summonerlist]
    }
    if (banPhase==false) {
      templist.summonerlist[pickIndex] = {name: '',champ:item[0],icon:item[1]}
      setBlueList(templist)
    }
    else if (banPhase==true){
      templist.banlist[banIndex]= {champ:item[0],icon:item[1]}
      setBlueList(templist)
    }
  }

  const handleConfirm = () => {
    if (banPhase == false){
      if (blueList.summonerlist[pickIndex].name != null) {
        setPickIndex(pickIndex+1)
        setBlueTurn(!blueTurn)
        dispatch(setBlueDraft(blueList))
      }
    }
    else {
      if (blueList.banlist[banIndex].champ != null) {
        setBanIndex(banIndex+1)
        setBlueTurn(!blueTurn)}
        dispatch(setBlueDraft(blueList))
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
          <img className='champselect-image' src={blueList.summonerlist[0].icon} alt=''/>
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
          <img className='champselect-image' src={blueList.summonerlist[1].icon} alt=''/>
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
          <img className='champselect-image' src={blueList.summonerlist[2].icon} alt=''/>
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
          <img className='champselect-image' src={blueList.summonerlist[3].icon} alt=''/>
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
          <img className='champselect-image' src={blueList.summonerlist[4].icon} alt=''/>
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
          <img className='champselect-image' src={redlist.summonerlist[0].icon} alt=''/>
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
          <img className='champselect-image' src={redlist.summonerlist[1].icon} alt=''/>
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
          <img className='champselect-image' src={redlist.summonerlist[2].icon} alt=''/>
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
        <img className='champselect-image' src={redlist.summonerlist[3].icon} alt=''/>   
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
          <img className='champselect-image' src={redlist.summonerlist[4].icon} alt=''/>
        </div>
      </div>
      <div className='blue-side-bans'>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[4].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[3].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[2].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[1].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[0].icon} alt=''/>
        </span>
      </div>
      <div className='red-side-bans'>
      <span className='ban-image-wrapper'>
          <img className='ban-image' src={redlist.banlist[0].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redlist.banlist[1].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redlist.banlist[2].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redlist.banlist[3].icon} alt=''/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={redlist.banlist[4].icon} alt=''/>
        </span>
      </div>
      <div className='lock-button'>
        <input className='confirm-button' type='button' value={'confirm'} onClick={()=>handleConfirm()}/>
      </div>
    </div>
  )
}
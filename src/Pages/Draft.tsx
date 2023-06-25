import { useEffect, useState } from 'react'
import '../Pages/draft-styles.css'
import { champlist } from './temp-champ-list'
import { BlueSummonerList, ChampSelection } from '../App/Types/champ-select-types'
import { useAppDispatch,useAppSelector } from '../App/hooks'
import {getBlueDraftState} from '../App/Slices/bluedraftSlice'

/*
need the champ select boxes to be constant size
lock in/confirm button
ban display
three links (draft captains + spectator) \
somehow I made a fucking memory leak so fix that. might be in handle champ select?

need to add a thing to the champion list that prevents champs that have been picked/baned from being selected
*/

export const Draft = () => {
  const [pickIndex,setPickIndex] = useState(0)
  const [banIndex,setBanIndex] = useState(0)
  const [blueList, setBlueList] = useState(useAppSelector(getBlueDraftState))
  const [banPhase,setBanPhase] = useState(true)
  const [blueTurn, setBlueTurn] = useState(true)
  ///eventually use a websocket to control a turn bolean that disables all the buttons when off

  ///should only be able to do stuff when blue turn is true

  /*
  need to include a dependency to prevent infinite rerenders
  eventully I probably want to make it dependent on changes to the whose turn check
  */


  useEffect(()=>{
    if (banIndex == 3 && pickIndex < 3 ){setBanPhase(false)}
    else if (banIndex == 3 && pickIndex == 3 ){setBanPhase(true)}
    else if (banIndex == 5 && pickIndex == 3 ){setBanPhase(false)}
  },[blueTurn])


  const handleChampSelect = (item:string[]) => {
    let templist:BlueSummonerList = {
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
      }
    }
    else {
      if (blueList.banlist[banIndex].champ != null) {
        setBanIndex(banIndex+1)
        setBlueTurn(!blueTurn)}
    }
  }

  const ChampList = () => {
    return(
      <div className='champ-list'>
        {champlist.map((item)=>{
          return(
            <div className='champion' id={item[0]} onClick={()=>handleChampSelect(item)}>
              <img src={item[1]}/>
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
       <input type='button' value={'BOTTOM'}/>
       <input type='button' value={'SUPPORT'}/>
       <input type='text' placeholder='Find Champion...'/>
      </div>
      <div className="blue-side">
        <div className='blue-summoner-1'>
          <img className='champselect-image' src={blueList.summonerlist[0].icon}/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-top'>Jungle</option>
              <option value='blue-top'>Middle</option>
              <option value='blue-top'>Bottom</option>
              <option value='blue-top'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-2'>
          <img className='champselect-image' src={blueList.summonerlist[1].icon}/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-top'>Jungle</option>
              <option value='blue-top'>Middle</option>
              <option value='blue-top'>Bottom</option>
              <option value='blue-top'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-3'>
          <img className='champselect-image' src={blueList.summonerlist[2].icon}/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-top'>Jungle</option>
              <option value='blue-top'>Middle</option>
              <option value='blue-top'>Bottom</option>
              <option value='blue-top'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-4'>
          <img className='champselect-image' src={blueList.summonerlist[3].icon}/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-top'>Jungle</option>
              <option value='blue-top'>Middle</option>
              <option value='blue-top'>Bottom</option>
              <option value='blue-top'>Support</option>
            </select>
          </div>
        </div>
        <div className='blue-summoner-5'>
          <img className='champselect-image' src={blueList.summonerlist[4].icon}/>
          <div className='role-select'>
            <select>
              <option value="" disabled selected hidden>Select Role...</option>
              <option value='blue-top'>Top</option>
              <option value='blue-top'>Jungle</option>
              <option value='blue-top'>Middle</option>
              <option value='blue-top'>Bottom</option>
              <option value='blue-top'>Support</option>
            </select>
          </div>
        </div>
      </div>
      <div className="champ-select">
        <ChampList/>
      </div>
      <div className="red-side">
        <div className='red-summoner-1'>
        </div>
        <div className='red-summoner-2'>
        </div>
        <div className='red-summoner-3'>
        </div>
        <div className='red-summoner-4'>
        </div>
        <div className='red-summoner-5'>
        </div>
      </div>
      <div className='blue-side-bans'>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[0].icon}/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[1].icon}/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[2].icon}/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[3].icon}/>
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={blueList.banlist[4].icon}/>
        </span>
      </div>
      <div className='red-side-bans'>
        <div>Red Bans</div>
      </div>
      <div className='lock-button'>
        <input className='confirm-button' type='button' value={'confirm'} onClick={()=>handleConfirm()}/>
      </div>
    </div>
  )
}
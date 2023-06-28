import { useEffect, useState } from 'react'
import '../Pages/draft-styles.css'
import { DraftList} from '../App/Types/champ-select-types'
import { BASE_URL } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { ReadyState } from 'react-use-websocket'
import { useGetDraftListQuery } from '../App/Slices/apiSlice'
import {draftList} from '../App/InitialStates/initialDraftList'
import { Timer } from '../App/Types/timer-types'
import { CountdownTimer } from '../Components/timer'


export const RedDraft = () => {

  const { data, error, isLoading, isSuccess} = useGetDraftListQuery('draftlist/')
  
  useEffect(()=>{
    if (isSuccess===true && data.champList!=undefined){  
      setNewDraft(data)
    }
    else{}
  },[isSuccess])
  
  const [newDraft, setNewDraft] = useState<DraftList>(draftList)
  const [outgoingDraft, setOutgoingDraft] = useState<DraftList|null>(null)
  const [currentSelection, setCurrentSelection] = useState<string[]|null>(null)

  const {sendMessage, lastMessage, readyState} = useWebSocket(BASE_URL, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      const response:DraftList = JSON.parse(message.data);
      setNewDraft(response)
    },
    share:true, ///maybe share should be false
    retryOnError: true,
    shouldReconnect: () => true
  })

  const [pickIndex,setPickIndex] = useState(0)
  const [banIndex,setBanIndex] = useState(0)
  const [banPhase,setBanPhase] = useState(true)
  
  useEffect(()=>{
    if (banIndex === 3 && pickIndex < 3 ){setBanPhase(false)}
    else if (banIndex === 3 && pickIndex == 3 ){setBanPhase(true)}
    else if (banIndex === 5 && pickIndex == 3 ){setBanPhase(false)}
    
    if (readyState === ReadyState.OPEN && outgoingDraft!=null) {    
      sendMessage(JSON.stringify(outgoingDraft))
      console.log(outgoingDraft.blueTurn)
    }
    ///do I want sendMessage in the dependencies
  },[readyState, outgoingDraft])

  const handleConfirm = () => {
    if (currentSelection!=null){
      const newChampList = newDraft.champList.filter((item)=>item[0]!=currentSelection[0])
      
        const newDraftList = {
        blueBanlist: [...newDraft.blueBanlist],
        blueSummonerlist: [...newDraft.blueSummonerlist],
        redBanlist: [...newDraft.redBanlist],
        redSummonerlist: [...newDraft.redSummonerlist],
        blueTurn: true,
        champList: newChampList,
        time: newDraft.time
      }
      setNewDraft(newDraftList)
      setOutgoingDraft(newDraftList)  
    }
    
    if (banPhase == false&&newDraft.blueSummonerlist!=null){
      if (newDraft.blueSummonerlist[pickIndex].name != null) {
        setPickIndex(pickIndex+1)
      }
    }
    else if (newDraft.blueBanlist!=null) {
      if (newDraft.blueBanlist[banIndex].champ != null) {
        setBanIndex(banIndex+1)
      }
    }
  }

  const ChampList = () => {
    const handleChampSelect = (item:string[]) => {  
      setCurrentSelection(item)
      if(
        newDraft.blueBanlist!=null
        &&newDraft.blueSummonerlist!=null
        &&newDraft.redBanlist!=null
        &&newDraft.redSummonerlist!=null){
        
        let draft:DraftList = {
        blueBanlist: [...newDraft.blueBanlist],
        blueSummonerlist: [...newDraft.blueSummonerlist],
        redBanlist: [...newDraft.redBanlist],
        redSummonerlist: [...newDraft.redSummonerlist],
        blueTurn: newDraft.blueTurn,
        champList: [...newDraft.champList],
        time: newDraft.time ///this may not work without the ...
      }
  
      if (banPhase==false) {
        draft.redSummonerlist[pickIndex] = {name: '',champ:item[0],icon:item[1]}
        setOutgoingDraft(draft)
  
      }
      else if (banPhase==true){
        draft.redBanlist[banIndex] = {champ:item[0],icon:item[1]}
        setOutgoingDraft(draft)
      }}
    }
      
    return(
      <div className='champ-list'>
        {newDraft.champList.map((item)=>{
          if (newDraft.blueTurn===false){
            return(
              <div 
                className='champion' 
                key={item[0]} id={item[0]} 
                onClick={()=>{handleChampSelect(item)}}>
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
  const RoleSelect = () => {
    return(
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
    )
  }
  const BlueSideDraft = () => {
    if (isLoading){
      return(<></>)
    }
    if (isSuccess) {
      return(
        <div className="blue-side">
          <div className='blue-summoner-1'>
            <img className='champselect-image' src={newDraft.blueSummonerlist[0].icon} alt=''/>
          </div>
          <div className='blue-summoner-2'>
            <img className='champselect-image' src={newDraft.blueSummonerlist[1].icon} alt=''/>
          </div>
          <div className='blue-summoner-3'>
            <img className='champselect-image' src={newDraft.blueSummonerlist[2].icon} alt=''/>
          </div>
          <div className='blue-summoner-4'>
            <img className='champselect-image' src={newDraft.blueSummonerlist[3].icon} alt=''/>   
          </div>
          <div className='blue-summoner-5'>
            <img className='champselect-image' src={newDraft.blueSummonerlist[4].icon} alt=''/>
          </div>
        </div>
      )
    }
    else{
      return(<></>)
    }
  }
  const BlueSideBans = () => {
    if (isLoading){
      return(<></>)
    }
    else if (isSuccess){
      return(
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
      )}
    else{
      return(null)
    }
    
  }

  const RedSideBans = () => {
    if (isLoading){
      return(<></>)
    }
    else if (isSuccess){
      return(
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
      )}
    else{
      return(null)
    }
    
  }

  const RedSideDraft = () => {
    if (isLoading){
      return(<></>)
    }
    if (isSuccess) {
      return(
        <div className="red-side">
        <div className='red-summoner-1'>
          <RoleSelect/>
          <img className='champselect-image' src={newDraft.redSummonerlist[0].icon} alt=''/>
        </div>
        <div className='red-summoner-2'>
          <RoleSelect/>
          <img className='champselect-image' src={newDraft.redSummonerlist[1].icon} alt=''/>
        </div>
        <div className='red-summoner-3'>
          <RoleSelect/>
          <img className='champselect-image' src={newDraft.redSummonerlist[2].icon} alt=''/>
        </div>
        <div className='red-summoner-4'>
          <RoleSelect/>
        <img className='champselect-image' src={newDraft.redSummonerlist[3].icon} alt=''/>   
        </div>
        <div className='red-summoner-5'>
          <RoleSelect/>
          <img className='champselect-image' src={newDraft.redSummonerlist[4].icon} alt=''/>
        </div>
      </div>
      )
    }
    else{
      return(<></>)
    }
  }

  const LaneSelect = () => {
    return(
      <div className='lane-select'>
      <input type='button' value={'TOP'}/>
      <input type='button' value={'JUNGLE'}/>
      <input type='button' value={'MIDDLE'}/>
      <input type='button' value={'BOTTOM  '}/>
      <input type='button' value={'SUPPORT'}/>
      <input type='text' placeholder='Find Champion...'/>
     </div>
    )
  }

  return( 
    <div className="grid-container">
      <LaneSelect/>
      <CountdownTimer minutes={0} seconds={60}/>
      <BlueSideDraft/>
      <RedSideDraft/>
      <div className="champ-select">
        <ChampList/>
      </div>
      <BlueSideBans/>
      <RedSideBans/>
      <div className='lock-button'>
        <input className='confirm-button' type='button' value={'confirm'} onClick={()=>handleConfirm()}/>
      </div>
    </div>
  )
}
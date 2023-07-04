import {useEffect, useState } from 'react'
///import '../Pages/draft-styles.css'
import { DraftList,isTimer} from '../App/Types/champ-select-types'
import { BASE_URL, MATCH_ID } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { ReadyState } from 'react-use-websocket'
import { useGetListQuery } from '../App/Slices/apiSlice'
import {initialDraftList} from '../App/InitialStates/initialDraftList'
import { CountdownTimer } from '../Components/CountdownTimer'
import { ChampSelect } from '../Components/ChampSelect'

export const BlueDraft = () => {
  const { data,isLoading, isSuccess} = useGetListQuery('draftlist/')
  
  useEffect(()=>{
    if (isSuccess===true && data.champList!==undefined){  
      setDraft(data)
    }
    else{}
  },[isSuccess])
  
  const [draft, setDraft] = useState<DraftList>(initialDraftList)
  const [updatedDraft, setUpdatedDraft] = useState<DraftList|null>(null)
  const [currentSelection, setCurrentSelection] = useState<string[]|null>(null) 
  const [pickIndex,setPickIndex] = useState(0)
  const [banIndex,setBanIndex] = useState(0)
  const [banPhase,setBanPhase] = useState(true)
  const [blueTurn, setBlueTurn] = useState(true)

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

  useEffect(()=>{
    

  },[draft])


  const handleConfirm = () => {
    if (banIndex === 3 && pickIndex < 3 ){setBanPhase(false)}
    else if (banIndex === 3 && pickIndex === 3 ){setBanPhase(true)}
    else if (banIndex === 5 && pickIndex === 3 ){setBanPhase(false)}

    if (currentSelection!==null){    
      const newDraftList = {...draft,
        champList:[...draft.champList.filter((item)=>item[0]!==currentSelection[0])],
        topList: [...draft.topList.filter((item)=>item[0]!==currentSelection[0])],
        jgList:[...draft.jgList.filter((item)=>item[0]!==currentSelection[0])],
        midList:[...draft.midList.filter((item)=>item[0]!==currentSelection[0])],
        bottomList:[...draft.bottomList.filter((item)=>item[0]!==currentSelection[0])],
        supportList:[...draft.supportList.filter((item)=>item[0]!==currentSelection[0])],
      }
      setDraft(newDraftList)
      setUpdatedDraft(newDraftList)  
      sendMessage(JSON.stringify({seconds:60}))
    }
    
    if (banPhase === false&&draft.blueSummonerlist!==null){
      if (draft.blueSummonerlist[pickIndex].name!==null) {
        setPickIndex(pickIndex+1)
      }
    }
    else if (draft.blueBanlist!==null) {
      if (draft.blueBanlist[banIndex].champ!==null) {
        setBanIndex(banIndex+1)
      }
    }
  }

  /*const ChampSelect = () => {
    const [champList,setChampList] = useState(draft.champList) 
    const [input,setInput] = useState('')
    const [laneView,setLaneView] = useState('ALL')

    useEffect(()=>{
      if (laneView==='TOP') {}
      else if (laneView==='JUNGLE') {setChampList(draft.jgList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else if (laneView==='MID') {setChampList(draft.midList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else if (laneView==='BOTTOM') {setChampList(draft.bottomList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else if (laneView==='SUPPORT') {setChampList(draft.supportList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else {setChampList(draft.champList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
    },[laneView])

    const handleSearch = (search:any) => {
      setInput(search)
      console.log(input)
    }

    const LaneSelect = () => {     
      return(
        <div className='lane-select'>
          <input type='button' value={'ALL'} onClick={()=>{setChampList(draft.champList);setLaneView('ALL')}}/>
          <input type='button' value={'TOP'} onClick={()=>{setChampList(draft.topList);setLaneView('TOP')}}/>
          <input type='button' value={'JUNGLE'} onClick={()=>{setChampList(draft.jgList);setLaneView('JUNGLE')}}/>
          <input type='button' value={'MIDDLE'} onClick={()=>{setChampList(draft.midList);setLaneView('MIDDLE')}}/>
          <input type='button' value={'BOTTOM'} onClick={()=>{setChampList(draft.bottomList);setLaneView('BOTTOM')}}/>
          <input type='button' value={'SUPPORT'} onClick={()=>{setChampList(draft.supportList);setLaneView('SUPPORT')}}/>
       </div>
      )
    }

    const handleChampSelect = (item:string[]) => {  
      setCurrentSelection(item)
      if(
        draft.blueBanlist!==null
        &&draft.blueSummonerlist!==null
        &&draft.redBanlist!==null
        &&draft.redSummonerlist!==null){
        
        let newDraft:DraftList = {...draft}
  
      if (banPhase===false) {
        debugger
        newDraft.blueSummonerlist[pickIndex] = {name: '',champ:item[0],icon:item[1]}
        setUpdatedDraft(draft)
  
      }
      else if (banPhase===true){
        newDraft.blueBanlist[banIndex] = {champ:item[0],icon:item[1]}
        setUpdatedDraft(newDraft)
      }}
    }
    
    const ChampList = () => {
      return(
          <div className='champ-list'>
            {champList.map((item)=>{
              return(
                <div 
                  className='champion' 
                  key={item[0]} id={item[0]} 
                  onClick={()=>{if(blueTurn===true){handleChampSelect(item)}}}>
                  <img src={item[1]} alt=''/>
                </div>)}
              )
            }
          </div>)}

    return (
      <div className='champ-select'>
        <input className='search-bar' type='text'  placeholder='Find Champion...' value={input} onChange={(e)=>{handleSearch(e.target.value)}}/>
        <LaneSelect/>
        <ChampList/>
      </div>
    )
  }*/

  const RoleSelect = () => {
    return(
      <div className='role-select'>
        <select className='roles'>
          <option defaultValue=''>Select Role...</option>
          <option value='blue-top'>Top</option>
          <option value='blue-jg'>Jungle</option>
          <option value='blue-mid'>Middle</option>
          <option value='blue-adc'>Bottom</option>
          <option value='blue-sup'>Support</option>
        </select>
        <select className='discord-ids'>
          <option defaultValue=''>Select Role...</option>
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
            <img className='champselect-image' src={draft.blueSummonerlist[0].icon} alt=''/>
            <RoleSelect/>
          </div>
          <div className='blue-summoner-2'>
            <img className='champselect-image' src={draft.blueSummonerlist[1].icon} alt=''/>
            <RoleSelect/>
          </div>
          <div className='blue-summoner-3'>
            <img className='champselect-image' src={draft.blueSummonerlist[2].icon} alt=''/>
            <RoleSelect/>
          </div>
          <div className='blue-summoner-4'>
            <img className='champselect-image' src={draft.blueSummonerlist[3].icon} alt=''/>   
            <RoleSelect/>
          </div>
          <div className='blue-summoner-5'>
            <img className='champselect-image' src={draft.blueSummonerlist[4].icon} alt=''/>
            <RoleSelect/>
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
            <img className='ban-image' src={draft.redBanlist[4].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[3].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[2].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[1].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBanlist[0].icon} alt=''/>
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
          <img className='champselect-image' src={draft.redSummonerlist[0].icon} alt=''/>
        </div>
        <div className='red-summoner-2'>
          <img className='champselect-image' src={draft.redSummonerlist[1].icon} alt=''/>
        </div>
        <div className='red-summoner-3'>
          <img className='champselect-image' src={draft.redSummonerlist[2].icon} alt=''/>
        </div>
        <div className='red-summoner-4'>
        <img className='champselect-image' src={draft.redSummonerlist[3].icon} alt=''/>   
        </div>
        <div className='red-summoner-5'>
          <img className='champselect-image' src={draft.redSummonerlist[4].icon} alt=''/>
        </div>
      </div>
      )
    }
    else{
      return(<></>)
    }
  }

  return( 
    <div className="grid-container">
      <CountdownTimer/>
      <ChampSelect/>
      <div className='lock-button'>
        <input className='confirm-button' type='button' value={'LOCK'} onClick={()=>handleConfirm()}/>
      </div>
    </div>
  )
}
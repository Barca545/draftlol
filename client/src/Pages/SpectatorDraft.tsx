import { useEffect, useState } from 'react'
import '../Pages/draft-styles.scss'
import { DraftList} from '../App/Types/champ-select-types'
import { BASE_URL } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { useGetListQuery } from '../App/Slices/apiSlice'
import {initialDraftList} from '../App/InitialStates/initialDraftList'
import { CountdownTimer } from '../Components/CountdownTimer'


export const SpectatorDraft = () => {
  const { data, error, isLoading, isSuccess} = useGetListQuery('draftlist/')
  
  useEffect(()=>{
    if (isSuccess===true && data.champList!==undefined){  
      setNewDraft(data)
    }
    else{}
  },[isSuccess])
  
  const [newDraft, setNewDraft] = useState<DraftList>(initialDraftList)

  useWebSocket(BASE_URL, {
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

  const ChampSelect = () => {
    const [champList,setChampList] = useState(newDraft.champList) 
    const [input,setInput] = useState('')
    const [laneView,setLaneView] = useState('ALL')
    
    useEffect(()=>{
      if (laneView==='TOP') {setChampList(newDraft.topList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else if (laneView==='JUNGLE') {setChampList(newDraft.jgList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else if (laneView==='MID') {setChampList(newDraft.midList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else if (laneView==='BOTTOM') {setChampList(newDraft.bottomList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else if (laneView==='SUPPORT') {setChampList(newDraft.supportList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
      else {setChampList(newDraft.champList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))}
    },[input])

    const handleSearch = (search:any) => {
      setInput(search)
      console.log(input)
    }

    const LaneSelect = () => {     
      return(
        <div className='lane-select'>
          <input type='button' value={'ALL'} onClick={()=>{setChampList(newDraft.champList);setLaneView('ALL')}}/>
          <input type='button' value={'TOP'} onClick={()=>{setChampList(newDraft.topList);setLaneView('TOP')}}/>
          <input type='button' value={'JUNGLE'} onClick={()=>{setChampList(newDraft.jgList);setLaneView('JUNGLE')}}/>
          <input type='button' value={'MIDDLE'} onClick={()=>{setChampList(newDraft.midList);setLaneView('MIDDLE')}}/>
          <input type='button' value={'BOTTOM'} onClick={()=>{setChampList(newDraft.bottomList);setLaneView('BOTTOM')}}/>
          <input type='button' value={'SUPPORT'} onClick={()=>{setChampList(newDraft.supportList);setLaneView('SUPPORT')}}/>
       </div>
      )
    }
    
    const ChampList = () => {
      return(
          <div className='champ-list'>
            {champList.map((item)=>{
              return(
                <div 
                  className='champion' 
                  key={item[0]} id={item[0]}>
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
        <div className='summoner'>
          <img className='champselect-image' src={newDraft.redSummonerlist[0].icon} alt=''/>
        </div>
        <div className='summoner'>
          <img className='champselect-image' src={newDraft.redSummonerlist[1].icon} alt=''/>
        </div>
        <div className='summoner'>
          <img className='champselect-image' src={newDraft.redSummonerlist[2].icon} alt=''/>
        </div>
        <div className='summoner'>
        <img className='champselect-image' src={newDraft.redSummonerlist[3].icon} alt=''/>   
        </div>
        <div className='summoner'>
          <img className='champselect-image' src={newDraft.redSummonerlist[4].icon} alt=''/>
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
      <BlueSideDraft/>
      <RedSideDraft/>
      <ChampSelect/>
      <BlueSideBans/>
      <RedSideBans/>
      <div className='lock-button'/>
    </div>
  )
}

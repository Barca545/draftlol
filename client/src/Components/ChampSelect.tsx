import {useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL,MATCH_ID } from '../App/Slices/baseurl'
import { DraftList, PickBanIndex, isDraft} from '../App/Types/champ-select-types'
import { initalAllChamps } from './initialStates/initalAllChamps' 
import { useAppSelector, useAppDispatch } from '../App/hooks'
import { getPickIndex, getBanIndex, setBanIndex, setPickIndex } from '../App/Slices/pickBanSlice'

export const BlueChampSelect = () => {
  const dispatch = useAppDispatch()
  const [draft, setDraft] = useState<DraftList|null>(null)
  ///easiest way to avoid the infinite rerender problem is by using an outgoing draft
  const [outgoingDraft, setOutgoingDraft] = useState<DraftList|null>(null)
  const [champList,setChampList] = useState(initalAllChamps)
  const [input,setInput] = useState('')
  const [selection, setSelection] = useState<string[]|null>(null)
  const pickNumber = useAppSelector(getPickIndex)
  const banNumber = useAppSelector(getBanIndex)
  

  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let data:DraftList = JSON.parse(message.data)
      setDraft(data)
      setChampList(data.champList)
    },
    share:false, 
    retryOnError: true,
    shouldReconnect: () => true
    })

  useEffect(()=>{
    if (isDraft(outgoingDraft)){sendMessage(JSON.stringify(outgoingDraft))}
  },[outgoingDraft])

  const handleConfirm = () => {
    ///needs to increment pick index
    
    if (isDraft(draft) && selection!==null){
      const newDraft:DraftList = {...draft,
        turn: 'Red',
        champList:[...draft.champList.filter((item)=>item[0]!==selection[0])],
        topList: [...draft.topList.filter((item)=>item[0]!==selection[0])],
        jgList:[...draft.jgList.filter((item)=>item[0]!==selection[0])],
        midList:[...draft.midList.filter((item)=>item[0]!==selection[0])],
        bottomList:[...draft.bottomList.filter((item)=>item[0]!==selection[0])],
        supportList:[...draft.supportList.filter((item)=>item[0]!==selection[0])]
      }
      switch (draft.phase) {
        case 'Ban' :{
          dispatch(setBanIndex(banNumber+1))
          if (banNumber===3 && pickNumber<3) {
            newDraft.phase = 'Pick'
          }

          break
        }
        case 'Pick' :{
          dispatch(setPickIndex(pickNumber+1))
          if (banNumber===3 && pickNumber===3) {
            newDraft.phase = 'Ban'
          }
          break
        }
      }

      setOutgoingDraft(newDraft)
      
    }
  }

  const LaneFilter = () => {
    if (isDraft(draft)) {
      return(
        <div className='lane-select'>
          <input type='button' value={'ALL'} onClick={()=>{setChampList(draft.champList)}}/>
          <input type='button' value={'TOP'} onClick={()=>{setChampList(draft.topList)}}/>
          <input type='button' value={'JUNGLE'} onClick={()=>{setChampList(draft.jgList)}}/>
          <input type='button' value={'MIDDLE'} onClick={()=>{setChampList(draft.midList)}}/>
          <input type='button' value={'BOTTOM'} onClick={()=>{setChampList(draft.bottomList)}}/>
          <input type='button' value={'SUPPORT'} onClick={()=>{setChampList(draft.supportList)}}/>
        </div>
      )
    }
    else {return(
      <></>
    )}
  }

  const ChampList = () => { 

    const handleChampionSelection = (champion:string[]) => {
      setSelection(champion)
      if (isDraft(draft)){
        const newDraft:DraftList = {...draft}
        switch (draft.phase){
          case 'Ban' :{
            newDraft.blueBans[banNumber] = {champ:champion[0],icon:champion[1]}
            setOutgoingDraft(newDraft)
            dispatch(setBanIndex(banNumber+1))
            break
          }
          case 'Pick':{
            newDraft.bluePicks[pickNumber] = {champ:champion[0],icon:champion[1]}
            dispatch(setPickIndex(pickNumber+1))
            setDraft(newDraft)
            break
          }
        }
      } 
    }
    
    if (isDraft(draft)) {
      if (draft.turn==='Blue') {
        return(
          <div className='champ-list'>
            {champList?.filter(array => array[0].toLowerCase().includes(input.toLowerCase())).map((champion)=>{
              return(
                <div 
                  className='champion' 
                  key={champion[0]} id={champion[0]}>
                  <img src={champion[1]} alt=''
                  onClick={()=>handleChampionSelection(champion)}/>
                </div>)}
              )
            }
          </div>)
      }
      else {
        return(
          <div className='champ-list'>
            {draft.champList.map((champion)=>{
              return(
                <div 
                  className='champion' 
                  key={champion[0]} id={champion[0]}>
                  <img src={champion[1]} alt=''/>
                </div>)}
              )
            }
          </div>)
      }
    }
    else {return(<></>)}
  }
  
  const BlueBans = () => {
    if (draft!==null) {
      return(
        <div className='blue-side-bans'>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[0].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[1].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[2].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[3].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[4].icon} alt=''/>
          </span>
        </div>
      )
    }
    else {return(<></>)}
  }

  const BluePicks = () => {
    if (isDraft(draft)) {
      return(
        <div className="blue-side">
          <div className='blue-summoner-1'>
            <img className='champselect-image' src={draft.bluePicks[0].icon} alt=''/>
          </div>
          <div className='blue-summoner-2'>
            <img className='champselect-image' src={draft.bluePicks[1].icon} alt=''/>
          </div>
          <div className='blue-summoner-3'>
            <img className='champselect-image' src={draft.bluePicks[2].icon} alt=''/>
          </div>
          <div className='blue-summoner-4'>
            <img className='champselect-image' src={draft.bluePicks[3].icon} alt=''/>   
          </div>
          <div className='blue-summoner-5'>
            <img className='champselect-image' src={draft.bluePicks[4].icon} alt=''/>
          </div>
        </div>
      )
    }
    else{
      return(<></>)
    }
  }

  const RedBans = () => {
    if (draft!==null) {
      return(
        <div className='red-side-bans'>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[0].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[1].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[2].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[3].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[4].icon} alt=''/>
          </span>
        </div>
      )
    }
    else {return(<></>)}
  }

  const RedPicks = () => {
    return(<></>)
  }
  
  if (isDraft(draft))  {
    return (
      <div className='champ-select'>
        <input placeholder='Search...' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        <LaneFilter/>
        <ChampList/>
        <BlueBans/>
        <RedBans/>
        <RedPicks/>
        <BluePicks/>
        <input type='button' value={'LOCK'} onClick={()=>handleConfirm()}/>
      </div>
    )  
  }
  else {
    return (<></>)}
}
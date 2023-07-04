import {useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL,MATCH_ID } from '../App/Slices/baseurl'
import { DraftList, PickBanIndex, isDraft} from '../App/Types/champ-select-types'


export const BlueChampSelect = () => {
  const [draft, setDraft] = useState<DraftList|null>(null)
  const [pickBanIndex,setPickBanIndex] = useState<PickBanIndex>({pickNumber:0,banNumber:0}) 
  const [champList,setChampList] = useState(draft?.champList)

  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let data:DraftList = JSON.parse(message.data)
      setDraft(data)
    },
    share:false, ///maybe share should be false
    retryOnError: true,
    shouldReconnect: () => true
    })

  useEffect(()=>{
    sendMessage(JSON.stringify(draft))
  },[draft])

  const SearchBar = () => {
    const [input,setInput] = useState('')

    useEffect(()=>{
      setChampList(champList?.filter(array => array[0].toLowerCase().includes(input.toLowerCase())))
    },[input])

    if (isDraft(draft)) {
      return(
        <div className='lane-select'>
          <input type='button' value={'ALL'} onClick={()=>{setChampList(draft.champList)}}/>
          <input type='button' value={'TOP'} onClick={()=>{setChampList(draft.topList)}}/>
          <input type='button' value={'JUNGLE'} onClick={()=>{setChampList(draft.jgList)}}/>
          <input type='button' value={'MIDDLE'} onClick={()=>{setChampList(draft.midList)}}/>
          <input type='button' value={'BOTTOM'} onClick={()=>{setChampList(draft.bottomList)}}/>
          <input type='button' value={'SUPPORT'} onClick={()=>{setChampList(draft.supportList)}}/>
          <input type='text' placeholder='Search...' value={input} onChange={(e)=>setInput(e.target.value)}/>
        </div>
      )
    }
    else {return(
      <></>
    )}
  }
  
  const ChampList = () => { 
    const handleChampionSelection = (champion:string[]) => {
      if (isDraft(draft)){
        const newDraft:DraftList = {...draft}
        switch (draft.phase){
          case 'Ban' :{
            newDraft.blueBans[pickBanIndex.banNumber] = {champ:champion[0],icon:champion[1]}
            setDraft(newDraft)
            setPickBanIndex({...pickBanIndex,banNumber:pickBanIndex.banNumber+1})
            break
          }
          case 'Pick':{
            newDraft.bluePicks[pickBanIndex.pickNumber] = {champ:champion[0],icon:champion[1]}
            setPickBanIndex({...pickBanIndex,pickNumber:pickBanIndex.pickNumber+1})
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
            {draft.champList.map((champion)=>{
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
  
  const BluePicks = () => {
    return(<></>)
  }
  
  if (isDraft(draft))  {
    return (
      <div className='champion-select'>
        <SearchBar/>
        <ChampList/>
        <BlueBans/>
        <RedBans/>
        <RedPicks/>
        <BluePicks/>
      </div>
    )  
  }
  else {
    return (<></>)}
}
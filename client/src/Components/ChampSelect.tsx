import {useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL,MATCH_ID } from '../App/Slices/baseurl'
import { DraftList, PickBanIndex, isDraft} from '../App/Types/champ-select-types'
import { initalAllChamps } from './initialStates/initalAllChamps' 
import { useAppSelector, useAppDispatch } from '../App/hooks'
import { getPickIndex, getBanIndex, setBanIndex, setPickIndex } from '../App/Slices/pickBanSlice'
import top_icon from '../Assets/lane-icons/top_icon.png'
import jungle_icon from '../Assets/lane-icons/jungle_icon.png'
import mid_icon from '../Assets/lane-icons/mid_icon.png'
import bot_icon from '../Assets/lane-icons/bot_icon.png'
import support_icon from '../Assets/lane-icons/support_icon.png'

export const ChampSelect = (props:any) => {
  const dispatch = useAppDispatch()
  const [draft, setDraft] = useState<DraftList|null>(null)
  const [outgoingDraft, setOutgoingDraft] = useState<DraftList|null>(null)
  const [champList,setChampList] = useState(initalAllChamps)
  const [input,setInput] = useState('')
  const [selection, setSelection] = useState<string[]|null>(null)
  const pickNumber = useAppSelector(getPickIndex)
  const banNumber = useAppSelector(getBanIndex)
  const [isActive,setIsActive] = useState({
    top: 'lane-button',
    jg: 'lane-button',
    mid: 'lane-button',
    bot: 'lane-button',
    sup: 'lane-button'
  })
  
  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/draft/blueside`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let data:DraftList = JSON.parse(message.data)
      setDraft(data)
      setChampList(data.champList)
    },
    share:true, 
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
        turn: props.oppposite,///this needs to be set to opposite side (needs a new prop)
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
          if (banNumber===2 && pickNumber===0 || banNumber===4 && pickNumber===3) {
            newDraft.phase = 'Pick'
          }

          break
        }
        case 'Pick' :{
          dispatch(setPickIndex(pickNumber+1))
          if (banNumber===3 && pickNumber===2) {
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
      const handleFilter = (list:string[][],lane:string) => {
        if (champList!==list) {
          switch (lane) {
            case 'Top': {
              setChampList(list)
              setIsActive({
                top:'lane-button-active',
                jg:'lane-button',
                mid:'lane-button',
                bot:'lane-button',
                sup:'lane-button',})
              break
            }
            case 'Jg': {
              setChampList(list)
              setIsActive({
                top:'lane-button',
                jg:'lane-button-active',
                mid:'lane-button',
                bot:'lane-button',
                sup:'lane-button',})
              break
            }
            case 'Mid': {
              setChampList(list)
              setIsActive({
                top:'lane-button',
                jg:'lane-button',
                mid:'lane-button-active',
                bot:'lane-button',
                sup:'lane-button',})
              break
            }
            case 'Bot': {
              setChampList(list)
              setIsActive({
                top:'lane-button',
                jg:'lane-button',
                mid:'lane-button',
                bot:'lane-button-active',
                sup:'lane-button',})
              break
            }
            case 'Sup': {
              setChampList(list)
              setIsActive({
                top:'lane-button',
                jg:'lane-button',
                mid:'lane-button',
                bot:'lane-button',
                sup:'lane-button-active',})
              break
            }
          }
        }
        else{
          setChampList(draft.champList)
          setIsActive({
            top: 'lane-button',
            jg: 'lane-button',
            mid: 'lane-button',
            bot: 'lane-button',
            sup: 'lane-button'
          })
        }
      }

      return(
        <div className='lane-filter' >
          <img src={top_icon} className={isActive.top} onClick={()=>{handleFilter(draft.topList,'Top')}}/>
          <img src={jungle_icon} className={isActive.jg} onClick={()=>{handleFilter(draft.jgList,'Jg')}}/>
          <img src={mid_icon} className={isActive.mid} onClick={()=>{handleFilter(draft.midList,'Mid')}}/>
          <img src={bot_icon} className={isActive.bot} onClick={()=>{handleFilter(draft.bottomList,'Bot')}}/>
          <img src={support_icon} className={isActive.sup} onClick={()=>{handleFilter(draft.supportList,'Sup')}}/>
        </div>
      )
    }
    else {return(
      <></>
    )}
  }

  const ChampList = () => {
    ///disable if ban = 5 pick = 4
    const handleChampionSelection = (champion:string[]) => {
      setSelection(champion)
      if (isDraft(draft)){
        const newDraft:DraftList = {...draft}
        switch (draft.phase){
          case 'Ban' :{
            newDraft.blueBans[banNumber] = {champ:champion[0],icon:champion[1]}
            setOutgoingDraft(newDraft)
            break
          }
          case 'Pick':{
            newDraft.bluePicks[pickNumber] = {champ:champion[0],icon:champion[1]}
            setOutgoingDraft(newDraft)
            break
          }
        }
      } 
    }
    
    if (isDraft(draft)) {
      if (draft.turn===props.side) {
        return(
          <div className='champ-list'>
            {champList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())).map((champion)=>{
              return(
                <div 
                  className='champion' 
                  key={champion[0]} id={champion[0]}>
                  <img src={champion[1]} alt='' onClick={()=>handleChampionSelection(champion)}/>
                </div>)}
              )
            }
          </div>)
      }
      else {
        return(
          <div className='champ-list'>
            {champList.map((champion)=>{
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
  
  const LockIn = () =>{
    if (banNumber<=5 && pickNumber<=4) {
      return(
        <input className="lock-button" value={'LOCK IN'} type="button" onClick={()=>handleConfirm()}/>
      )
    }
    else {
      return(
        <input className="lock-button" value={'LOCK IN'} type="button"/>
      )
    }
  }

  if (isDraft(draft))  {
    return (
      <div className='champ-select'>
        <div className='champ-select-header'>
          <LaneFilter/>
          <input className='search-bar' placeholder='Search...' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        </div>
        <ChampList/>
        <div className="champ-select-footer">
          <LockIn/>
        </div>
      </div>
    )  
  }
  else {
    return (<></>)}
}
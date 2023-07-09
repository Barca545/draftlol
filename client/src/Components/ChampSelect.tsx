import {useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL,MATCH_ID } from '../App/Slices/baseurl'
import { DraftList, isDraft} from '../App/Types/champ-select-types'
import { initalAllChamps } from './initialStates/initalAllChamps' 
import top_icon from '../Assets/lane-icons/top_icon.png'
import jungle_icon from '../Assets/lane-icons/jungle_icon.png'
import mid_icon from '../Assets/lane-icons/mid_icon.png'
import bot_icon from '../Assets/lane-icons/bot_icon.png'
import support_icon from '../Assets/lane-icons/support_icon.png'
import { LockIn } from './LockIn'

export const ChampSelect = (props:any) => {
  const [draft, setDraft] = useState<DraftList|null>(null)
  const [outgoingDraft, setOutgoingDraft] = useState<DraftList|null>(null)
  const [champList,setChampList] = useState(initalAllChamps)
  const [input,setInput] = useState('')
  const [selection, setSelection] = useState<string[]>([])
  const [isActive,setIsActive] = useState({
    top: 'lane-button',
    jg: 'lane-button',
    mid: 'lane-button',
    bot: 'lane-button',
    sup: 'lane-button'
  })
  ///not sure if this being blueside/redside is affecting it
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

 /* const handleConfirm = () => {
    ///needs to increment pick index
    if (isDraft(draft) && selection!==null){
      const newDraft:DraftList = {...draft,
        turnNumber: draft.turnNumber+1,
        champList:[...draft.champList.filter((item)=>item[0]!==selection[0])],
        topList: [...draft.topList.filter((item)=>item[0]!==selection[0])],
        jgList:[...draft.jgList.filter((item)=>item[0]!==selection[0])],
        midList:[...draft.midList.filter((item)=>item[0]!==selection[0])],
        bottomList:[...draft.bottomList.filter((item)=>item[0]!==selection[0])],
        supportList:[...draft.supportList.filter((item)=>item[0]!==selection[0])]
      }
      switch(draft.turnNumber) {
        case 0: {
          newDraft.turn = 'Red'
          break
        }
        case 1: {
          newDraft.turn = 'Blue'
          break
        }
        case 2: {
          newDraft.turn = 'Red'
          break
        }
        case 3: {
          newDraft.turn = 'Blue'
          break
        }
        case 4: {
          newDraft.turn = 'Red'
          break
        }
        case 5: {
          newDraft.turn = 'Blue'
          break
        }
        case 6: {
          newDraft.turn = 'Red'
          break
        }
        case 7: {
          newDraft.turn = 'Red'
          break
        }
        case 8: {
          newDraft.turn = 'Blue'
          break
        }
        case 9: {
          newDraft.turn = 'Blue'
          break
        }
        case 10: {
          newDraft.turn = 'Red'
          break
        }
        case 11: {
          newDraft.turn = 'Red'
          break
        }
        case 12: {
          newDraft.turn = 'Blue'
          break
        }
        case 13: {
          newDraft.turn = 'Red'
          break
        }
        case 14: {
          newDraft.turn = 'Blue'
          break
        }
        case 15: {
          newDraft.turn = 'Red'
          break
        }
        case 16: {
          newDraft.turn = 'Blue'
          break
        }
        case 17: {
          newDraft.turn = 'Done'
          break
        }
        case 18: {
          newDraft.turn = 'Red'
          break
        }
        case 19: {
          newDraft.turn = 'Done'
          break
        }
      }
      setOutgoingDraft(newDraft)
      console.log(newDraft)
    }
  }*/

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
    const handleChampionSelection = (champion:string[]) => {
      setSelection(champion)
      if (isDraft(draft)){
        const newDraft:DraftList = {...draft}
        switch(draft.turnNumber) {
          case 0: {
            newDraft.blueBans[0] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 1: {
            newDraft.redBans[0] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 2: {
            newDraft.blueBans[1] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 3: {
            newDraft.redBans[1] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 4: {
            newDraft.blueBans[2] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 5: {
            newDraft.redBans[2] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 6: {
            newDraft.bluePicks[0] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 7: {
            newDraft.redPicks[0] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 8: {
            newDraft.redPicks[1] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 9: {
            newDraft.bluePicks[1] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 10: {
            newDraft.bluePicks[2] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 11: {
            newDraft.redPicks[2] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 12: {
            newDraft.redBans[3] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 13: {
            newDraft.blueBans[3] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 14: {
            newDraft.redBans[4] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 15: {
            newDraft.blueBans[4] = {champ:champion[0],icon:champion[1]}
            break
          }
          case 16: {
            newDraft.redPicks[3] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 17: {
            newDraft.bluePicks[3] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 18: {
            newDraft.bluePicks[4] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
          case 19: {
            newDraft.redPicks[4] = {name: '', role: '',champ:champion[0],icon:champion[1]}
            break
          }
        }
        setOutgoingDraft(newDraft)
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
  
  /*const LockIn = () =>{
    if (isDraft(draft)) {
      return(
        <input className="lock-button" value={'LOCK IN'} type="button" onClick={()=>handleConfirm()}/>
      )
    }
    else {
      return(
        <input className="lock-button" value={'LOCK IN'} type="button"/>
      )
    }
  }*/

  if (isDraft(draft))  {
    return (
      <div className='champ-select'>
        <div className='champ-select-header'>
          <LaneFilter/>
          <input className='search-bar' placeholder='Search...' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        </div>
        <ChampList/>
        <div className="champ-select-footer">
          <LockIn selection={selection} draft={draft}/>
        </div>
      </div>
    )  
  }
  else {
    return (<></>)}
}
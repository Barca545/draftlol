import {useEffect, useState } from 'react'
import { DraftList, isDraft} from '../App/Types/champ-select-types'
import top_icon from '../Assets/lane-icons/top_icon.png'
import jungle_icon from '../Assets/lane-icons/jungle_icon.png'
import mid_icon from '../Assets/lane-icons/mid_icon.png'
import bot_icon from '../Assets/lane-icons/bot_icon.png'
import support_icon from '../Assets/lane-icons/support_icon.png'
import { LockIn } from './LockIn'
import { SendMessage } from 'react-use-websocket'


export const ChampSelect = (props:{side:'Blue'|'Red',opposite:'Blue'|'Red', id:string, draft:DraftList, updateDraft:SendMessage}) => {
  const [champList,setChampList] = useState(props.draft.champList)
  const [input,setInput] = useState('')
  const [selection, setSelection] = useState<string[]>([])
  const [isActive,setIsActive] = useState({
    top: 'lane-button',
    jg: 'lane-button',
    mid: 'lane-button',
    bot: 'lane-button',
    sup: 'lane-button'
  })

  useEffect(()=>{
    setChampList(props.draft.champList)
  },[props.draft.champList])

  const LaneFilter = () => {
    if (isDraft(props.draft)) {
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
          setChampList(props.draft.champList)
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
          <img src={top_icon} className={isActive.top} onClick={()=>{handleFilter(props.draft.topList,'Top')}}/>
          <img src={jungle_icon} className={isActive.jg} onClick={()=>{handleFilter(props.draft.jgList,'Jg')}}/>
          <img src={mid_icon} className={isActive.mid} onClick={()=>{handleFilter(props.draft.midList,'Mid')}}/>
          <img src={bot_icon} className={isActive.bot} onClick={()=>{handleFilter(props.draft.bottomList,'Bot')}}/>
          <img src={support_icon} className={isActive.sup} onClick={()=>{handleFilter(props.draft.supportList,'Sup')}}/>
        </div>
      )
    }
    else {return(
      <></>
    )}
  }

  const ChampList = () => {
    const handleChampionSelection = (champion:string[]) => {
      const newDraft:DraftList = {...props.draft}
      setSelection(champion)
      switch(props.draft.turnNumber) {
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
          newDraft.bluePicks[0] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 7: {
          newDraft.redPicks[0] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 8: {
          newDraft.redPicks[1] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 9: {
          newDraft.bluePicks[1] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 10: {
          newDraft.bluePicks[2] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 11: {
          newDraft.redPicks[2] = {summoner:null,champ:champion[0],icon:champion[1]}
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
          newDraft.redPicks[3] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 17:   {
          newDraft.bluePicks[3] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 18: {
          newDraft.bluePicks[4] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
        case 19: {
          newDraft.redPicks[4] = {summoner:null,champ:champion[0],icon:champion[1]}
          break
        }
      }
      props.updateDraft(JSON.stringify(newDraft))
    }
    
    if (isDraft(props.draft)) {
      if (props.draft.turn===props.side) {
        return(
          <div className='champ-list'>
            {props.draft.champList.filter(array => array[0].toLowerCase().includes(input.toLowerCase())).map((champion)=>{
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
  
  if (isDraft(props.draft))  {
    return (
      <div className='champ-select'>
        <div className='champ-select-header'>
          <LaneFilter/>
          <input className='search-bar' placeholder='Search...' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
        </div>
        <ChampList/>
        <div className="champ-select-footer">
          <LockIn id={props.id} selection={selection} side={props.side} draft={props.draft} updateDraft={props.updateDraft}/>
        </div>
      </div>
    )  
  }
  else {
    return (<></>)
  }
}
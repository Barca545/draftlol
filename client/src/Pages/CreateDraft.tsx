import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid'


export const CreateDraft = (props:{id:string|null, setId:React.Dispatch<React.SetStateAction<string>>}) => {
  const navigate = useNavigate()
  
  useEffect(()=>{
    console.log(props.id)
  },[props.id])

  const handleCreateGame = () => {
    props.setId(uuid().substring(0,8))
  }

  const GameButtons = () => {
    const handleClick = (side:'Blue'|'Red'|'Spectate') => {
      switch(side){
        case 'Blue': {
          navigate(`/${props.id}/blueside`)
          break
        }
        case 'Red': {
          navigate(`/${props.id}/redside`)
          break
        }
        case 'Spectate': {
          console.log('add spectate')
          break
        }
      }
    }
    
    return(
      <div>
        <input className="BlueButton" value='Blue' type='button' onClick={()=>{handleClick('Blue')}}/> 
        <input className="RedButton" value='Red' type='button' onClick={()=>{handleClick('Red')}}/> 
        <input className="SpectateButton" value='Spectate' type='button' onClick={()=>{handleClick('Spectate')}}/> 
      </div>
    )
  }
  
  return (
    <div>
      <input type='button' value={'NEW GAME'} onClick={()=>handleCreateGame()}/> 
      <GameButtons/>
    </div>
  )
}
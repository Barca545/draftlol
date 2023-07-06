import { PositionSelect } from "../App/Types/role-select-types"
import { useState } from "react"

///props will have to be the champion name so include it inside the summoner Div somewhere
///embed this in the pick div and 
///somehow have the div pass the champ name to this and give it the ability to update the draft

export const RoleSelect = (props:{champion:string}) => {
  const [position, setPosition] = useState('TOP')
  
  const summoners:PositionSelect[] = [
    {summoner:'Fish',role:'TOP',champion:null},
    {summoner:'Ouken',role:'JUNGLE',champion:null},
    {summoner:'HappyBlueGuy',role:'MIDDLE',champion:null},
    {summoner:'Envoker',role:'BOTTOM',champion:null},
    {summoner:'adc',role:'SUPPORT',champion:null}
  ]

  return(
    <div className="role-selection">
      <select className='summoner-selection' onChange={(e)=>setPosition(e.target.value)}>
        <option value={summoners[0].role}>{`${summoners[0].summoner}`}</option>
        <option value={summoners[1].role}>{`${summoners[1].summoner}`}</option>
        <option value={summoners[2].role}>{`${summoners[2].summoner}`}</option>
        <option value={summoners[3].role}>{`${summoners[3].summoner}`}</option>
        <option value={summoners[4].role}>{`${summoners[4].summoner}`}</option>
      </select>
      <select className='position-selection' value={position} onChange={e=>setPosition(e.target.value)}>
        <option value={'TOP'}>{'TOP'}</option>
        <option value={'JUNGLE'}>{'JUNGLE'}</option>
        <option value={'MIDDLE'}>{'MIDDLE'}</option>
        <option value={'BOTTOM'}>{'BOTTOM'}</option>
        <option value={'SUPPORT'}>{'SUPPORT'}</option>
      </select>
    </div>
  )  
}
import { PositionSelect } from "../App/Types/role-select-types"
import { useState } from "react"

///props will have to be the champion name so include it inside the summoner Div somewhere
///embed this in the pick div and 
///somehow have the div pass the champ name to this and give it the ability to update the draft

export const RoleSelect = (props:{champion:string}) => {
  const [roles, setRoles] = useState(['TOP','JUNGLE','MIDDLE','BOTTOM','SUPPORT'])
  
  const summoners:PositionSelect[] = [
    {summoner:'Fish',role:'TOP',champion:null},
    {summoner:'Ouken',role:'JUNGLE',champion:null},
    {summoner:'HappyBlueGuy',role:'MIDDLE',champion:null},
    {summoner:'Envoker',role:'BOTTOM',champion:null},
    {summoner:'adc',role:'SUPPORT',champion:null}
  ]

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    ///find way to have it change the other select based on the summoner given to it
  }

  return(
    <div className="role-selection">
      <select className='position-selection' onChange={(e)=>handleSelect(e)}>
        <option value={summoners[0].role}>{`${summoners[0].summoner}`}</option>
        <option value={summoners[1].role}>{`${summoners[1].summoner}`}</option>
        <option value={summoners[2].role}>{`${summoners[2].summoner}`}</option>
        <option value={summoners[3].role}>{`${summoners[3].summoner}`}</option>
        <option value={summoners[4].role}>{`${summoners[4].summoner}`}</option>
      </select>
      <select className='position-selection'>
        {roles.map((role)=>{
          return(
            <option>{role}</option>
          )})}
      </select>
    </div>
  )  
}
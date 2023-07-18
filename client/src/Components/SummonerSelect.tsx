import { Summoner } from "../App/Types/champ-select-types"

export const SummonerSelect = (props:{summoner:Summoner}) =>{
  return(
    <select>
      <option value={props.summoner.name}>{props.summoner.name}</option>
    </select>
  )
}
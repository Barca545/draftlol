import {DraftList } from "../App/Types/champ-select-types"
import none_selected from '../Assets/champ-select-icons/none_selected.webp'

export const RedBans = (props:{draft:DraftList}) => {
  return(
    <div className='red-bans'>
      {props.draft?.redBans[4]!==undefined ? <img className='ban-image' src={props.draft?.redBans[4].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.redBans[3]!==undefined ? <img className='ban-image' src={props.draft?.redBans[3].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.redBans[2]!==undefined ? <img className='ban-image' src={props.draft?.redBans[2].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.redBans[1]!==undefined ? <img className='ban-image' src={props.draft?.redBans[1].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.redBans[0]!==undefined ? <img className='ban-image' src={props.draft?.redBans[0].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
    </div>
  )
}
import {DraftList } from "../App/Types/champ-select-types"
import none_selected from '../Assets/champ-select-icons/none_selected.webp'

export const BlueBans = (props:{draft:DraftList}) => {
  return(
    <div className='blue-bans'>
      {props.draft?.blueBans[0]!==undefined ? <img className='ban-image' src={props.draft?.blueBans[0].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.blueBans[1]!==undefined ? <img className='ban-image' src={props.draft?.blueBans[1].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.blueBans[2]!==undefined ? <img className='ban-image' src={props.draft?.blueBans[2].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.blueBans[3]!==undefined ? <img className='ban-image' src={props.draft?.blueBans[3].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      {props.draft?.blueBans[4]!==undefined ? <img className='ban-image' src={props.draft?.blueBans[4].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
    </div>
  )
}


import {DraftList } from "../App/Types/champ-select-types"
import none_selected from '../Assets/champ-select-icons/none_selected.webp'

export const BluePicks = (props:{draft:DraftList}) => {
  return(
    <div className="blue-picks">
      <div className='summoner'>
        {props.draft?.bluePicks[0]!==undefined ? <img className='champselect-image' src={props.draft?.bluePicks[0].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.bluePicks[1]!==undefined ? <img className='champselect-image' src={props.draft?.bluePicks[1].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.bluePicks[2]!==undefined ? <img className='champselect-image' src={props.draft?.bluePicks[2].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.bluePicks[3]!==undefined ? <img className='champselect-image' src={props.draft?.bluePicks[3].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.bluePicks[4]!==undefined ? <img className='champselect-image' src={props.draft?.bluePicks[4].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
    </div>
  )
}
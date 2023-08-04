import {DraftList } from "../App/Types/champ-select-types"
import none_selected from '../Assets/champ-select-icons/none_selected.webp'

export const RedPicks = (props:{draft:DraftList}) => {
  return(
    <div className="red-picks">
      <div className='summoner'>
        {props.draft?.redPicks[0]!==undefined ? <img className='champselect-image' src={props.draft?.redPicks[0].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.redPicks[1]!==undefined ? <img className='champselect-image' src={props.draft?.redPicks[1].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.redPicks[2]!==undefined ? <img className='champselect-image' src={props.draft?.redPicks[2].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.redPicks[3]!==undefined ? <img className='champselect-image' src={props.draft?.redPicks[3].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
      <div className='summoner'>
        {props.draft?.redPicks[4]!==undefined ? <img className='champselect-image' src={props.draft?.redPicks[4].icon} alt=''/>:<img className='ban-image' src={none_selected} alt=''/>}
      </div>
    </div>
  )
}
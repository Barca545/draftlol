import { isDraft,DraftList } from "../App/Types/champ-select-types"

export const BlueBans = (draft:DraftList) => {
    if (isDraft(draft)) {
      return(
        <div className='blue-bans'>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[0].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[1].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[2].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[3].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.blueBans[4].icon} alt=''/>
          </span>
        </div>
      )
    }
    else {return(<></>)}
  }
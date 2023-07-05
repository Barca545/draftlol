import { DraftList } from "../App/Types/champ-select-types"

const RedBans = (draft:DraftList) => {
    if (draft!==null) {
      return(
        <div className='red-bans'>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[0].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[1].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[2].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[3].icon} alt=''/>
          </span>
          <span className='ban-image-wrapper'>
            <img className='ban-image' src={draft.redBans[4].icon} alt=''/>
          </span>
        </div>
      )
    }
    else {return(<></>)}
  }
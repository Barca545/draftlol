import { isDraft,DraftList } from "../App/Types/champ-select-types"

export const BluePicks = (draft:DraftList) => {
    if (isDraft(draft)) {
      return(
        <div className="blue-picks">
          <div className='summoner'>
            <img className='champselect-image' src={draft.bluePicks[0].icon} alt=''/>
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.bluePicks[1].icon} alt=''/>
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.bluePicks[2].icon} alt=''/>
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.bluePicks[3].icon} alt=''/>   
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.bluePicks[4].icon} alt=''/>
          </div>
        </div>
      )
    }
    else{
      return(<></>)
    }
  }
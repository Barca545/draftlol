import { isDraft,DraftList } from "../App/Types/champ-select-types"

export const RedPicks = (draft:DraftList) => {
    if (isDraft(draft)) {
      return(
        <div className="red-picks">
          <div className='summoner'>
            <img className='champselect-image' src={draft.redPicks[0].icon} alt=''/>
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.redPicks[1].icon} alt=''/>
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.redPicks[2].icon} alt=''/>
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.redPicks[3].icon} alt=''/>   
          </div>
          <div className='summoner'>
            <img className='champselect-image' src={draft.redPicks[4].icon} alt=''/>
          </div>
        </div>
      )
    }
    else{
      return(<></>)
    }
  }
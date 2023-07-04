import React from 'react';
import { DraftList } from '../App/Types/champ-select-types';

export const Bans = (draft: DraftList) => {
    return (
        <div className='blue-side-bans'>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={draft.blueBanlist[0].icon} alt='' />
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={draft.blueBanlist[1].icon} alt='' />
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={draft.blueBanlist[2].icon} alt='' />
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={draft.blueBanlist[3].icon} alt='' />
        </span>
        <span className='ban-image-wrapper'>
          <img className='ban-image' src={draft.blueBanlist[4].icon} alt='' />
        </span>
      </div>
    )
}

export default Bans;
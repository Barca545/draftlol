import { DraftList } from "../App/Types/champ-select-types"
import { BlueSummonerSelect } from "./BlueSummonerSelect"
import {RedSummonerSelect} from './RedSummonerSelect'

export const RoleSelect = (props:{onClose:any, draft:DraftList, show:boolean, side:'Blue'|'Red'|'Done'}) => {
  if (props.show===false) {return (<></>)}

  if (props.side==='Blue') {
    return(
      <div className="end-draft-container">
        <div className="end-draft">
          {props.draft.bluePicks.map((pick)=>{
            return(
              <div key={pick.champ} className="role-select">
                <img className='assignemnt-champ-icon' src={pick.icon}/>
                <BlueSummonerSelect players={props.draft.BluePlayers} draft={props.draft} champName={pick.champ}/>
              </div>
            )})}
          <input type="button" value={'CONFIRM DRAFT'} onClick={props.onClose}/>
          <input type="button" value={'RESET'}/>
        </div>
      </div>
    ) 
  }
  else if (props.side==='Red') {
    return(
      <div className="end-draft-container">
        <div className="end-draft">
          {props.draft.redPicks.map((pick)=>{
            return(
              <div key={pick.champ} className="role-select">
                <img className='assignemnt-champ-icon' src={pick.icon}/>
                <RedSummonerSelect players={props.draft.RedPlayers} draft={props.draft} champName={pick.champ}/>
              </div>
            )})}
          <input type="button"  value={'CONFIRM DRAFT'} onClick={props.onClose}/>
          <input type="button" value={'RESET'}/>
        </div>
      </div>
    ) 
  }
  else {return (<></>)}
}
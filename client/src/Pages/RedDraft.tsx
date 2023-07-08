import { BlueBans } from "../Components/BlueBans";
import { BluePicks } from "../Components/BluePicks";
import { RedPicks } from "../Components/RedPicks";
import { RedBans } from '../Components/RedBans'
import { ChampSelect } from "../Components/ChampSelect";
import { CountdownTimer } from "../Components/CountdownTimer";
import { TeamBanner } from "../Components/team-banner";
import '../Styles/draft-styles.scss'
import { useState } from "react"

///think I need to make the confirm button it's own component
export const RedDraft = () => {
  const [turn,setTurn] = useState(19)
  const [show,setShow] = useState(false)

  if(turn===19){
    return(
      <div className="draft-container">
        <div className="draft-container-header">
          <CountdownTimer/>
          <TeamBanner side={'blue'}/>
          <TeamBanner side={'red'}/>
        </div>
        <ChampSelect side={'Red'} opposite={'Blue'}/>
        <BluePicks/>
        <RedPicks/>
        <BlueBans/>
        <RedBans/>
        <input type="button" value={'SHOW'} onClick={()=>setShow(!show)}/>
      </div>
    )
  }
  else{
    return(
      <div className="draft-container">
        <div className="draft-container-header">
          <CountdownTimer/>
          <TeamBanner side={'blue'}/>
          <TeamBanner side={'red'}/>
        </div>
        <ChampSelect side={'Red'} opposite={'Blue'}/>
        <BluePicks/>
        <RedPicks/>
        <BlueBans/>
        <RedBans/>
        <input type="button" value={'SHOW'} onClick={()=>setShow(!show)}/>
      </div>
    )
  }
}
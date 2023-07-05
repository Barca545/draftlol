import { BlueBans } from "../Components/BlueBans";
import { BluePicks } from "../Components/BluePicks";
import { RedPicks } from "../Components/RedPicks";
import { RedBans } from '../Components/RedBans'
import { ChampSelect } from "../Components/ChampSelect";
import { CountdownTimer } from "../Components/CountdownTimer";
import { TeamBanner } from "../Components/team-banner";
import '../Styles/draft-styles.scss'

export const BlueDraft = () => {
  
  return(
    <div className="draft-container">
      <div className="draft-container-header">
        <CountdownTimer/>
        <TeamBanner side={'blue'}/>
        <TeamBanner side={'red'}/>
      </div>
      <ChampSelect side={'Blue'} opposite={'Red'}/>
      <BluePicks/>
      <RedPicks/>
      <BlueBans/>
      <RedBans/>
    </div>
  )
}
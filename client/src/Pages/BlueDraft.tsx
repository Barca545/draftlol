import { BlueBans } from "../Components/BlueBans";
import { BluePicks } from "../Components/BluePicks";
import { RedPicks } from "../Components/RedPicks";
import { RedBans } from '../Components/RedBans'
import { ChampSelect } from "../Components/ChampSelect";
import '../Styles/draft-styles.scss'

export const BlueDraft = () => {
  
  return(
    <div className="draft-container">
      <ChampSelect side={'Blue'}/>
      <BluePicks/>
      <RedPicks/>
      <BlueBans/>
      <RedBans/>
    </div>
  )
}
import { BlueBans } from "../Components/BlueBans";
import { BluePicks } from "../Components/BluePicks";
import { RedPicks } from "../Components/RedPicks";
import { RedBans } from '../Components/RedBans'
import { ChampSelect } from "../Components/ChampSelect";

export const BlueDraft = () => {
  return(
    <>
      <BlueBans/>
      <BluePicks/>
      <ChampSelect side={'Red'}/>
      <RedBans/>
      <RedPicks/>
    </>
  )
}
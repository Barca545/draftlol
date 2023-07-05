import { ChampSelect } from "../Components/ChampSelect"
import { CountdownTimer } from "../Components/CountdownTimer"
import '../Styles/champ-select-styles.css'

export const CreateDraft = () => {
  return (
    <div className="draft-container">
      <CountdownTimer/>
      <ChampSelect side={'Blue'}/>
    </div>
  )
}
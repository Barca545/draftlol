import { ChampSelect } from "../Components/ChampSelect"
import { CountdownTimer } from "../Components/CountdownTimer"

export const CreateDraft = () => {
  return (
    <div className="draft-container">
      <CountdownTimer/>
      <ChampSelect side={'Blue'}/>
    </div>
  )
}
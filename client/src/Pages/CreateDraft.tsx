import { ChampSelect } from "../Components/ChampSelect"
import { CountdownTimer } from "../Components/CountdownTimer"
import { RoleSelect } from "../Components/RoleSelect"
import { useState } from "react"
import { initialDraftList } from "../Components/initialStates/initialDraftList"

export const CreateDraft = () => {
  const [show,setShow] = useState(false)
  let draft = initialDraftList
  
  if (show===true){
    return (
    <div className="draft-container">
      <RoleSelect champion='' draft ={draft}/>
      <input type="button" value={'SHOW'} onClick={()=>setShow(!show)}/>
    </div>
  )}
  else{return(
  <div className="draft-container">
    <input type="button" value={'SHOW'} onClick={()=>setShow(!show)}/>
  </div>)}
}
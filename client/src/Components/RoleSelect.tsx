export const RoleSelect = (props:any) => {
  const summoners:string[] = ['Fish','Envoker','adc','HappyBlueGuy','Kitten']
  //make two extra arrays(objects?) in the draftlist RedSumnmoners and BlueSumnmoners that have 
  //[<name>,<position>,<champions>] that get updated with the information whenever someone selects from the dropdown
  //have ppl have to select the 'Finish" draft button that pulls up a modal to confirm the roles and then destroys the room
  return(
    <div className="role-selection">
      <select className='position-selection'>
        <option>TOP</option>
        <option>JUNGLE</option>
        <option>MIDDLE</option>
        <option>BOTTOM</option>
        <option>SUPPORT</option>
      </select>
      <select className='position-selection'>
        <option>{`${summoners[0]}`}</option>
        <option>{`${summoners[1]}`}</option>
        <option>{`${summoners[2]}`}</option>
        <option>{`${summoners[3]}`}</option>
        <option>{`${summoners[4]}`}</option>
      </select>
    </div>
  )  
}
import {useEffect,useState} from 'react'
import { Timer, isTimer} from '../App/Types/champ-select-types'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL, MATCH_ID } from '../App/Slices/baseurl'
import { DraftList } from '../App/Types/champ-select-types'

export const CountdownTimer = (props:{draftlist:DraftList}) => { 
  const [time, setTime] = useState<Timer|null>(null)
  const [draft,setDraft] = useState(props.draftlist)
  const [turn,setTurn] = useState<"Red" | "Blue" | "Done">("Blue")

  const sleep = (seconds:number ) => new Promise(
    resolve => setTimeout(resolve, seconds*1000)
  )

  const {sendMessage} = useWebSocket(`${BASE_URL}/${MATCH_ID}/timer`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let timer:Timer = JSON.parse(message.data)
      setTime(timer)
    },
    share:false, 
    retryOnError: true,
    shouldReconnect: () => true
  })
  
  //this needs to change the side to the opposite side
  //I might need to change how this works tbh
  const handleReset = async (sleepTimer:number) => {
    await sleep(sleepTimer)
    sendMessage(JSON.stringify({seconds:60}))
  }
  
  const tick = () => {
    if (time!==null){
      if (time.seconds>0) {
        const newTime = {seconds:time.seconds-1}
        setTime(newTime)
        ///I am sort of worried them both sending the message will cause issues but it seems to work
        sendMessage(JSON.stringify(newTime))
      }
    }  
  }
  
  
  /*this needs to send it to the next turn
  - easiest way to do this might be a store but perhaps there is a way that does not require as much refactoring
  - one solution might be to have the lock in component open up a timer websocket 
    and have it run the handle confirm function when the timer hits 0
  */

  //resets the timer on 0
  useEffect(() => {
    if(time?.seconds===0){
      handleReset(2)
    } 
    else{ 
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId)
    }
  },[time])

  //reset the timer on a selection
  useEffect(() => {
    console.log(props.draftlist.turn)
    console.log(turn)
    if (props.draftlist.turn!==turn){
      handleReset(0)
    }
  },[props.draftlist.turn])
  
  if(time?.seconds!=undefined){
    return (
      <div className='timer'>
        <p>{`${time.seconds.toString().padStart(2, '0')}`}</p> 
      </div>
    )
  }
  else {
    return (
      <></>
    )
  }
}
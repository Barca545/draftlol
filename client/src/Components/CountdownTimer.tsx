import {useEffect,useState} from 'react'
import { Timer } from '../App/Types/timer-types'
import '../Pages/draft-styles.css'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL } from '../App/Slices/baseurl'
import { DraftList } from '../App/Types/champ-select-types'

export const CountdownTimer = ({minutes,seconds}:Timer) => { 
  const [time, setTime] = useState<Timer>({minutes,seconds})
  const [target, setTarget] = useState(0)
  const [draftList, setDraftList] = useState<DraftList|null>(null)
  
  const {sendMessage} = useWebSocket(BASE_URL, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      if(target!==JSON.parse(message.data.targetTime)){
        setTarget(JSON.parse(message.data.targetTime)
        ///set the draftlist to the draft list
        setDraftList(JSON.parse(message.data))
        )}
    },
    share:true, ///maybe share should be false
    retryOnError: true,
    shouldReconnect: () => true
  })
  
  const handleReset = () => {
    setTime({minutes: time.minutes, seconds: time.seconds})
    const newTime = {
      type:time,
      timer: Date.now()+60000
    }

    sendMessage(JSON.stringify(newTime))
  }
  

  const tick = () => {
    if (time.minutes === 0 && time.seconds === 0) {
      setTime({minutes: 0, seconds: 0})
    }
    else if (time.seconds===0) {
      setTime({minutes: time.minutes-1, seconds: 59})
    }
    else {
      setTime({minutes: time.minutes, seconds: time.seconds-1})
    }
  }

  ///this news effect needs to reset if the target changes I believe putting it in the dependency array does this
  useEffect(() => {
    if(target>Date.now()){
      const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId)
    }
    else{handleReset()}
  },[target])

  return (
    <div className='timer'>
      <p>{`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p> 
    </div>
  )
}
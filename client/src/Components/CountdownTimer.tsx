import {useEffect,useState} from 'react'
import { Timer, isTimer} from '../App/Types/champ-select-types'
import '../Pages/draft-styles.scss'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL, MATCH_ID } from '../App/Slices/baseurl'

export const CountdownTimer = () => { 
  const [time, setTime] = useState<Timer|null>(null)

  const sleep = (seconds:number ) => new Promise(
    resolve => setTimeout(resolve, seconds*1000)
  )

  const {sendMessage } = useWebSocket(`${BASE_URL}/${MATCH_ID}/timer`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message:WebSocketEventMap['message']) => {
      let timer:Timer = JSON.parse(message.data)
      setTime(timer)
      console.log(timer)
    },
    share:false, 
    retryOnError: true,
    shouldReconnect: () => true
  })
  
  const handleReset = async () => {
    await sleep(2)
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

  useEffect(() => {
    if(time?.seconds===0){
      handleReset()
    }
    else{ 
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId)
    }
  },[time])
  
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
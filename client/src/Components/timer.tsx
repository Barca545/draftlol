import {useEffect,useState} from 'react'
import { Timer } from '../App/Types/timer-types'
import '../Pages/draft-styles.css'

export const CountdownTimer = ({minutes=0,seconds=0}:Timer) => {
    ///when timer is 0 useEffect to set the Blue turn
    ///probably need to mirror time on the server
    const [time, setTime] = useState<Timer>({minutes,seconds})

    ///const reset = () => setTime({minutes: time.minutes, seconds: time.seconds});
  
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

    useEffect(() => {
      const timerId = setInterval(() => tick(), 1000);
      ///what does clear/set Interval do
      return () => clearInterval(timerId)
    })

    return (
      <div className='timer'>
        <p>{`${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p> 
      </div>
    )
  }
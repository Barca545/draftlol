import {useEffect,useState} from 'react'
import { Timer } from '../App/Types/timer-types'
import '../Pages/draft-styles.css'

///make it so ResetTimer on the draftlist is set to false
///confirm sets it to true on outgoing draft
///sends it out, you get it back and then it gets reset


export const CountdownTimer = ({reset,minutes,seconds}:Timer) => { 
    const [time, setTime] = useState<Timer>({reset,minutes,seconds})


    ///const handleReset = () => {setTime({reset:false, minutes: time.minutes, seconds: time.seconds})}
    
    ///useEffect(()=>{
   //   if (reset===true) {handleReset()}
   // },[reset])
   
    const tick = () => {
      if (time.minutes === 0 && time.seconds === 0) {
        setTime({reset:reset, minutes: 0, seconds: 0})
      }
      else if (time.seconds===0) {
        setTime({reset:reset, minutes: time.minutes-1, seconds: 59})
      }
      else {
        setTime({reset:reset, minutes: time.minutes, seconds: time.seconds-1})
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
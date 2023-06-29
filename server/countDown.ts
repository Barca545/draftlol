import { Timer } from "./types/timer-types"

///let initalTime:Timer = {minutes:1,seconds:0}

export const countDown = (time:Timer) => {
  const tick = () => {
    if (time.minutes === 0 && time.seconds === 0) {
      time = {minutes: 0, seconds: 0}
    }
    else if (time.seconds===0) {
      time = {minutes: time.minutes-1, seconds: 59}
    }
    else {
      time = {minutes: time.minutes, seconds: time.seconds-1}
    }
  }
  const timer = setInterval(()=>tick(),1000)
  return(timer) 
}


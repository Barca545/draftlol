import { BASE_URL } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { useEffect, useState } from 'react'

export const RedDraft = () => {
  const {sendMessage, readyState} = useWebSocket(`${BASE_URL}/status?name=ryan`, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    onMessage: (message) => {
      setNewMessage(message.data)
    },
    /*shouldReconnect: (closeEvent) => true,
    onMessage: (event:WebSocketEventMap['message']) => (event: { data: string; }) => {
      const response:DraftList = JSON.parse(event.data);
    }*/
    share:true, ///maybe share should be false
    retryOnError: true,
    shouldReconnect: () => true
  })

  

  const [newMessage,setNewMessage] = useState('')

  const handleMessage = () => {}
  return(
    <>
      <input type='button' value='test' onClick={()=>handleMessage()}/>
      
    </>
  )
}
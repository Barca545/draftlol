import { BASE_URL } from '../App/Slices/baseurl'
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { useEffect, useState } from 'react'
import { useGetDraftListQuery } from '../App/Slices/apiSlice'

export const RedDraft = () => {
  const { data, error, isLoading } = useGetDraftListQuery('draftlist/')
  
  const {sendMessage, readyState} = useWebSocket(`${BASE_URL}/`, {
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
    <div>
      {error?(<>error</>): data?(<>{newMessage}</>):null}      
    </div>
  )
}
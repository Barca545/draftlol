import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlueDraft } from './Pages/BlueDraft';
import { RedDraft } from './Pages/RedDraft';
import { SpectatorDraft } from './Pages/SpectatorDraft';
import {useWebSocket} from 'react-use-websocket/dist/lib/use-websocket'
import { BASE_URL } from './App/Slices/baseurl';



function App() {
  const {sendMessage, lastMessage} = useWebSocket(BASE_URL, {
    onOpen: () => console.log('connection opened'),
    onClose: () => console.log('connection closed'),
    /*shouldReconnect: (closeEvent) => true,
    onMessage: (event:WebSocketEventMap['message']) => (event: { data: string; }) => {
      const response:DraftList = JSON.parse(event.data);
    }*/
  })
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/blueside' index element={<BlueDraft/>}/>
        <Route path='/redside' index element={<RedDraft/>}/>
        <Route path='/spectate' index element={<SpectatorDraft/>}/>
      </Routes>  
    </BrowserRouter>
  );
}

export default App;

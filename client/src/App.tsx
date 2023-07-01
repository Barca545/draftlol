import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlueDraft } from './Pages/BlueDraft';
import { RedDraft } from './Pages/RedDraft';
import { SpectatorDraft } from './Pages/SpectatorDraft';
import { CreateDraft } from './Pages/CreateDraft';



function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<CreateDraft/>}/>
        <Route path='/blueside' index element={<BlueDraft/>}/>
        <Route path='/redside' index element={<RedDraft/>}/>
        <Route path='/spectate' index element={<SpectatorDraft/>}/>
      </Routes>  
    </BrowserRouter>
  );
}

export default App;

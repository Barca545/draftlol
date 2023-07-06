import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateDraft } from './Pages/CreateDraft';
import { BlueDraft } from './Pages/BlueDraft';
import {RedDraft} from './Pages/RedDraft'

function App() {  
  return (
    <div className="page-container">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<CreateDraft/>}/>
          <Route path='/blueside' index element={<BlueDraft/>}/>
          <Route path='/redside' index element={<RedDraft/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}
export default App;

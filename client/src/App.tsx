import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateDraft } from './Pages/CreateDraft';
import { BlueDraft } from './Pages/BlueDraft';
import {RedDraft} from './Pages/RedDraft'

function App() {  
  //perhaps this page should be the create draft page here
  const [id,setId] = useState<string>('test')
  
  return (
    <div className="page-container">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<CreateDraft id={id} setId={setId}/>}/>
          <Route path={`/:id/blueside`} index element={<BlueDraft id={id}/>}/>
          <Route path={`/:id/redside`} index element={<RedDraft id={id}/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}
export default App;

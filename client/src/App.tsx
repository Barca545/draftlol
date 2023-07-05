import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateDraft } from './Pages/CreateDraft';
import { BlueDraft } from './Pages/BlueDraft';

function App() {  
  return (
    <div className="page-container">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<CreateDraft/>}/>
          <Route path='/blueside' index element={<BlueDraft/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  );
}
export default App;

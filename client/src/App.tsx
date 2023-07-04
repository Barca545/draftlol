import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateDraft } from './Pages/CreateDraft';



function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<CreateDraft/>}/>
      </Routes>  
    </BrowserRouter>
  );
}
export default App;

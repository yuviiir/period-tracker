import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Homepage from './Components/Homepage/Homepage';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Homepage/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

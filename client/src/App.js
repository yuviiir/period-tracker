import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Homepage from './Components/Homepage/Homepage';
import LandingPage from './Components/LandingPage/LandingPage';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
            <Route exact path="/home" element={<Homepage/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPool from './UserPool';

//Components
import Homepage from './Components/Homepage/Homepage';
import LandingPage from './Components/LandingPage/LandingPage';
import Footer from './Components/Common/Footer/Footer';
import Nav from './Components/Common/Nav/Nav';
import Loader from './Components/Common/Loader/Loader';

import { Context } from "./Context/Context";

function App() {
  const context = useContext(Context);
  let routes = ["/home"]
  return (
    <React.Fragment>
      {
        routes.includes(window.location.pathname) ?
          <Nav></Nav>
        :
          null
      }
      <div className="App">
        {
          context.isLoading ? 
            <Loader /> 
          : 
            null
        }
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
            <Route exact path="/home" element={<Homepage/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;

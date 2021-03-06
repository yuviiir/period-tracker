import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

//Components
import Homepage from './Components/Homepage/Homepage';
import LandingPage from './Components/LandingPage/LandingPage';
import JournalPage from './Components/JournalPage/JournalPage';
import Nav from './Components/Common/Nav/Nav';

import { PeriodTrackerContext } from "./Context/Context";

function App() {
  const context = useContext(PeriodTrackerContext);

  const NotFound = () => (
    <div className='not-found'>
      <h1>404 - Not Found!</h1>
      <Link className='popup-button' to="/">Go Home</Link>
    </div>
  );

  useEffect(() => {
    if (routes.includes(window.location.pathname)) {
      if (!context.email || !context.jwtToken) {
        context.resetState();
        window.location.href = "/";
      }
    };
  }, []);

  let routes = ["/home", "/journal"]
  return (
    <React.Fragment>
      <div className="App">
        <BrowserRouter>
          {
            routes.includes(window.location.pathname) ?
              <Nav></Nav>
            :
              null
          }
          <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
            <Route exact path="/home" element={<Homepage/>}></Route>
            <Route exact path="/journal" element={<JournalPage/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;

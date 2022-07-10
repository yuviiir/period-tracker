import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Homepage from './Components/Homepage/Homepage';
import LandingPage from './Components/LandingPage/LandingPage';
import Footer from './Components/Common/Footer/Footer';
import Nav from './Components/Common/Nav/Nav';

function App() {
  const context = useContext(PeriodTrackerContext);

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
      {
        routes.includes(window.location.pathname) ?
          <Nav></Nav>
        :
          null
      }
      <div className="App">
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

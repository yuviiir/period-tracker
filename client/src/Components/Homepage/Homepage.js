import React, { useState, useEffect, useContext } from "react";
import CurrentCycle from "./Components/CurrentCycle/CurrentCycle";
import Summary from "./Components/Summary/Summary";
import WelcomeBlock from "./Components/WelcomeBlock/WelcomeBlock";
import HealthInsights from "./Components/HealthInsights/HealthInsights";
import Activities from "./Components/Activities/Activities";
import "./Homepage.css";
import { PeriodTrackerContext } from "../../Context/Context";
import { getCycle } from "../../Services/Services";

const Homepage = () => {
  const context = useContext(PeriodTrackerContext);
  const [currentCycle, setCurrentCycle] = useState({});

  function getCurrentCycle() {
    getCycle(context.jwtToken)
      .then((res) => {
        setCurrentCycle(res);
      })
      .catch((err) => {
        //error
        console.log(err);
      });
  }

  useEffect(() => {
    getCurrentCycle();
  }, []);

  return (
    <React.Fragment>
      <section className="homepage-wrapper">
        <section className="left-wrapper">
          <WelcomeBlock></WelcomeBlock>
          <CurrentCycle day={currentCycle.dayInCycle}></CurrentCycle>
          <Summary cycle={currentCycle}></Summary>
          <HealthInsights
            avgPeriod={currentCycle.avgCycleLength}
            avgCycle={currentCycle.avgPeriodLength}
          ></HealthInsights>
        </section>
        <section className="right-wrapper">
          <Activities></Activities>
        </section>
      </section>
    </React.Fragment>
  );
};

export default Homepage;

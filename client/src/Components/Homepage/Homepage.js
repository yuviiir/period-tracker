import React from 'react';
import CurrentCycle from './Components/CurrentCycle/CurrentCycle';
import Summary from './Components/Summary/Summary';
import WelcomeBlock from './Components/WelcomeBlock/WelcomeBlock';
import HealthInsights from './Components/HealthInsights/HealthInsights';
import Activities from './Components/Activities/Activities';
import './Homepage.css';

const Homepage = () => {
    
    return (
        <React.Fragment>
            <section className='homepage-wrapper'>
                <section className='left-wrapper'>
                <WelcomeBlock></WelcomeBlock>
                <CurrentCycle></CurrentCycle>
                <Summary></Summary>
                <HealthInsights></HealthInsights>
                </section>
                <section className='right-wrapper'>
                    <Activities></Activities>
                </section>
            </section>
        </React.Fragment>
    );
}

export default Homepage;
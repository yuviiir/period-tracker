import React from 'react';
import './Summary.css';

const Summary = () => {
    let summaryInfo = GetSummary()
    
    return (
        <React.Fragment>
            <section className='summary-wrapper'>
                <h1>Summary</h1>
                <ul>
                    <li>
                    Your next cycle<span>{summaryInfo[0]} days</span>
                    </li>
                    <li>
                    Fertility level<span>{summaryInfo[1]}</span>
                    </li>
                    <li>
                    You're currently in<span>{summaryInfo[2]}</span>
                    </li>
                </ul>
            </section>
        </React.Fragment>
    );
}



const GetSummary = () => {
    const phases = ['Menstruation', 'Follicular Phase', 'Ovulation', 'Lutheal Phase']
    const fertilityLevels = ['Low', 'Normal', 'High']

    let cycleLength = 32
    let currentDay = 6

    let nextCycle = cycleLength - currentDay
    let fertilityLevel = fertilityLevels[0]
    let phase = phases[0]

    return [nextCycle, fertilityLevel, phase]
}

export default Summary;
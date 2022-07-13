import React from 'react';
import './Summary.css';

const Summary = (props) => {
    const cycle = props.cycle

    const GetSummary = () => {
        const phases = ['Menstruation', 'Follicular Phase', 'Ovulation', 'Lutheal Phase']
        const fertilityLevels = ['Low', 'Normal', 'High']
    
        const cycleLength = 28
        let currentDay = cycle.dayInCycle
        let nextCycle
        let fertilityLevel
        let phase
    
        if (currentDay) {
            nextCycle = (cycleLength - currentDay) + " days"

            if ((currentDay >= 1 && currentDay < 8) || (currentDay > 16 && currentDay <= 28))
                fertilityLevel = fertilityLevels[0]
            else if ((currentDay >= 8 && currentDay < 10) || (currentDay > 14 && currentDay <= 16))
                fertilityLevel = fertilityLevels[1]
            else
                fertilityLevel = fertilityLevels[2]

            if (currentDay >= 1 && currentDay < 6)
                phase = phases[0]
            else if (currentDay >= 6 && currentDay < 12)
                phase = phases[1]
                else if (currentDay >= 12 && currentDay < 17)
                phase = phases[2]
            else 
                phase = phases[3]
        } else {
            nextCycle = "Not enough info"
            fertilityLevel = "Not enough info"
            phase = "Not enough info"
        }
    
        return [nextCycle, fertilityLevel, phase]
    }

    const summaryInfo = GetSummary()
    
    return (
        <React.Fragment>
            <section className='summary-wrapper'>
                <h1>Summary</h1>
                <ul>
                    <li>
                    Your next cycle<span>{summaryInfo[0]}</span>
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

export default Summary;
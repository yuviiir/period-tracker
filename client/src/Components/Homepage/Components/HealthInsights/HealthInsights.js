import React from 'react';
import './HealthInsights.css';
import arrow from './circular-arrow.png';
import blooddrop from './blooddrop.png';

const HealthInsights = () => {
    let cycleLength = 32
    let periodLength = 5
    let lengthInsights = GetLengthInsights(cycleLength, periodLength)
    
    return (
        <React.Fragment>
            <section className='health-insights-wrapper'>
                <h1>Insights</h1>
                <p>Everything looks good 👌 <br/>
                Your cycle and period were regular.</p>
                <article className='cycle-insight'>
                    <span>
                    <img alt='cycle icon' src={arrow}></img>
                    <h2>{cycleLength} days</h2>
                    </span>
                    <p>{lengthInsights[0]}</p>
                    <p>Average: 29 days</p>
                </article>
                <article className='period-insight'>
                    <span>
                    <img alt='period icon' src={blooddrop}></img>
                    <h2>{periodLength} days</h2>
                    </span>
                    <p>{lengthInsights[1]}</p>
                    <p>Average: 6 days</p>
                </article>
            </section>
        </React.Fragment>
    );
}

const GetLengthInsights = (cycleLength, periodLength) => {
    const lengthInsights = {
        'Normal': '💚 Normal',
        'Short': '💛 Short',
        'Long': '🧡 Long'
    }

    let insightCombo

    let cycle
    if (cycleLength < 21) {
        cycle = lengthInsights.Short
        insightCombo = "S"
    } else if (cycleLength > 38) {
        cycle = lengthInsights.Long
        insightCombo = "L"
    } else {
        cycle = lengthInsights.Normal
        insightCombo = "N"
    }

    let period
    if (periodLength < 3) {
        period = lengthInsights.Short
        insightCombo += "S"
    } else if (periodLength > 7) {
        period = lengthInsights.Long
        insightCombo += "L"
    } else {
        period = lengthInsights.Normal
        insightCombo += "N"
    }

    return [cycle, period]
}

export default HealthInsights;
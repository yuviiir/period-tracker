import React from 'react';
import './HealthInsights.css';
import arrow from './circular-arrow.png';
import blooddrop from './blooddrop.png';

const HealthInsights = (props) => {

    const GetLengthInsights = () => {
        const lengthInsights = {
            'Normal': '💚 Normal',
            'Short': '💛 Short',
            'Long': '🧡 Long',
            'Error': '❗ Not enough info'
        }
    
        let cycle
        let cycleInsight
        if (props.avgCycle) {
            if (props.avgCycle < 21) {
                cycle = lengthInsights.Short
                cycleInsight = "Girl, your cycle is on the short side 🤔\n"
            } else if (props.avgCycle > 38) {
                cycle = lengthInsights.Long
                cycleInsight = "Girl, that is one long cycle 😶\n"
            } else {
                cycle = lengthInsights.Normal
                cycleInsight = "Yass, everything looks good this cycle 👌\n"
            } 
        } else {
            cycle = lengthInsights.Error
            cycleInsight = "We're gonna need a bit more info for your cycle."
        }
    
        let period
        let periodInsight
        if (props.avgPeriod) {
            if (props.avgPeriod < 3 && props.avgPeriod) {
                period = lengthInsights.Short
                periodInsight = "Your period is looking a bit short."
            } else if (props.avgPeriod > 7) {
                period = lengthInsights.Long
                periodInsight = "Your period is looking a bit long."
            } else {
                period = lengthInsights.Normal
                periodInsight = "Your period is regular."
            }
        } else {
            period = lengthInsights.Error
            periodInsight = "We're gonna need a bit more info for your period."
        }
    
        return [cycle, cycleInsight, period, periodInsight]
    }

    let cycleLength = props.avgCycle ? props.avgCycle + " days" : "Oops"
    let periodLength = props.avgPeriod ? props.avgPeriod + " days" : "Oops"
    let lengthInsights = GetLengthInsights()
    
    return (
        <React.Fragment>
            <section className='health-insights-wrapper'>
                <h1>Insights</h1>
                <p>{lengthInsights[1]} <br></br> {lengthInsights[3]}</p>
                <article className='cycle-insight'>
                    <span>
                    <img alt='cycle icon' src={arrow}></img>
                    <h2>{cycleLength}</h2>
                    </span>
                    <p>{lengthInsights[0]}</p>
                    <p>Average: 28 days</p>
                </article>
                <article className='period-insight'>
                    <span>
                    <img alt='period icon' src={blooddrop}></img>
                    <h2>{periodLength}</h2>
                    </span>
                    <p>{lengthInsights[2]}</p>
                    <p>Average: 5 days</p>
                </article>
            </section>
        </React.Fragment>
    );
}

export default HealthInsights;
import React from 'react';
import './CurrentCycle.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CurrentCycle = () => {

    const cycleDays = 28;
    
    return (
        <React.Fragment>
            <section className='current-cycle-wrapper'>
                <CircularProgressbarWithChildren value={8} minValue={0} maxValue={cycleDays} 
                    styles={{
                        path: {
                            stroke: '#EC9CBC'
                        },
                        trail: {
                            stroke: '#F6EEF1'
                        },
                        text: {
                            fill: '#EC9CBC',
                            fontSize: '1rem'
                        }
                    }}>
                        <p id='cycle-day'>day<br/><strong>6</strong></p>
                    </CircularProgressbarWithChildren>
            </section>
        </React.Fragment>
    );
}

export default CurrentCycle;
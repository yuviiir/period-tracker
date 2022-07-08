import React from 'react';
import './Activities.css';

const Activities = () => {
    
    return (
        <React.Fragment>
            <section className='activities-wrapper'>
                <h1>What do you want to do?</h1>
                <article className='activity-block-wrapper' id='log'>
                    <h1>Log your moods and symptoms</h1>
                </article>
                <article className='activity-block-wrapper' id='day'>
                    <h1>Dive into your day</h1>
                </article>
                <article className='activity-block-wrapper' id='month'>
                    <h1>View your calendar</h1>
                </article>
            </section>
        </React.Fragment>
    );
}

export default Activities;
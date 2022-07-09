import React from 'react';
import './Activities.css';
import { a } from "react-router-dom";

const Activities = () => {
    
    return (
        <React.Fragment>
            <section className='activities-wrapper'>
                <h1>What do you want to do?</h1>
                <a href="/journal" style={{ textDecoration: 'none', color: 'black'}}>
                <article className='activity-block-wrapper' id='log'>
                    <h1>Log your moods and symptoms</h1>
                </article>
                </a>
                
                <a href="/journal" style={{ textDecoration: 'none', color: 'black'}}>
                <article className='activity-block-wrapper' id='day'>
                    <h1>Dive into your day</h1>
                </article>
                </a>

                <a href="/journal" style={{ textDecoration: 'none', color: 'black'}}>
                <article className='activity-block-wrapper' id='month'>
                    <h1>View your calendar</h1>
                </article>
                </a>
            </section>
        </React.Fragment>
    );
}

export default Activities;
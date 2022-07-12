import React from 'react';
import './Activities.css';
import { useNavigate } from 'react-router';

const Activities = () => {

    let navigate = useNavigate();
    function routeChange(path) { 
        navigate(path);
    }
    
    return (
        <React.Fragment>
            <section className='activities-wrapper'>
                <a onClick={() => routeChange("/journal")} style={{ textDecoration: 'none', color: 'black'}}>
                <article className='activity-block-wrapper' id='log'>
                    <h1>Log your moods and symptoms</h1>
                </article>
                </a>
                
                <a onClick={() => routeChange("/journal")} style={{ textDecoration: 'none', color: 'black'}}>
                <article className='activity-block-wrapper' id='day'>
                    <h1>Dive into your day</h1>
                </article>
                </a>

                <a onClick={() => routeChange("/journal")} style={{ textDecoration: 'none', color: 'black'}}>
                <article className='activity-block-wrapper' id='month'>
                    <h1>View your calendar</h1>
                </article>
                </a>
            </section>
        </React.Fragment>
    );
}

export default Activities;
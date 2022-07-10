import React from 'react';
import './JournalWelcomeBlock.css';

const JorunalWelcomeBlock = () => {
    
    return (
        <React.Fragment>
            <section className='journal-welcome-block-wrapper'>
                <article>
                <h1>Journal</h1>
                <p>Hey, UserName 😊 <br/> How are you feeling?</p>
                <p className='description'>Stay on top of your cycle, record moods and symptoms, and keep track of the daily vibes all in one place.</p>
                </article>
                <img alt='welcome illustration' src='https://static.vecteezy.com/system/resources/previews/001/872/747/non_2x/illustration-of-young-woman-writing-vector.jpg'></img>
            </section>
        </React.Fragment>
    );
}

export default JorunalWelcomeBlock;
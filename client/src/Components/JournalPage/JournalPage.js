import React from 'react';
import './JournalPage.css';
import JournalWelcomeBlock from './Components/WelcomeBlock/JournalWelcomeBlock';
import EntryForm from './Components/EntryForm/EntryForm';

const JournalPage = () => {
    return (
        <React.Fragment>
            <section className='journalpage-wrapper'>
                <section className='left-wrapper'>
                    <JournalWelcomeBlock></JournalWelcomeBlock>
                </section>
                <section className='right-wrapper'>
                    <EntryForm></EntryForm>
                </section>
            </section>
        </React.Fragment>
    );
}

export default JournalPage;
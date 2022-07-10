import React from 'react';
import './WelcomeBlock.css';

const WelcomeBlock = () => {
    
    return (
        <React.Fragment>
            <section className='welcome-block-wrapper'>
                <article>
                <h1>Hello, <span>UserName</span></h1>
                <p>Here's a look at your current cycle.</p>
                </article>
                <img alt='welcome illustration' src='https://cdn.dribbble.com/users/1450874/screenshots/14117193/media/b5880da19d2d395280c14f3520f5977d.jpg'></img>
            </section>
        </React.Fragment>
    );
}

export default WelcomeBlock;
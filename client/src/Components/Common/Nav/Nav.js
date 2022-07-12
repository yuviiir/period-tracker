import React, { useContext } from 'react';
import './Nav.css';

import Icon from '../Images/SharkWeekLogo.png';
import { PeriodTrackerContext } from '../../../Context/Context'; 
import { useNavigate } from 'react-router';

const Nav = (props) => {
    const context = useContext(PeriodTrackerContext);
    let links = [];
    if (props?.indexPagePopup) {
        links = [
            {
                name: "Login",
                onclick: () => props?.indexPagePopup('Login')
            },
            {
                name: "Sign up",
                onclick: () => props?.indexPagePopup('Sign in')
            }
        ]
    }
    else {
        links = [
            {
                name: "Home",
                onclick: () => routeChange('/home')
            },
            {
                name: "Journal",
                onclick: () => routeChange('/journal')
            },
            {
                name:  `Logout (${context?.email})`,
                onclick: () => logout()
            },
        ]
    }
    
    function logout() {
        context.resetState();
        window.location.href = "/";
    }

    function goToHome() {
        if (props?.indexPagePopup)
            routeChange('/');
        else
            routeChange('/home');

    }
    
    let navigate = useNavigate();
    function routeChange(path) { 
        navigate(path);
    }

    return (
        <React.Fragment>
            <header className='nav-wrapper'>
                <aside className='nav-logo-wrapper' onClick={() => goToHome()}>
                    <img className='nav-logo' src={Icon}></img>
                    <h3 className='nav-header'>S H A R K W E E K</h3>
                </aside>
                <ul className='nav-links'>
                    {
                        links.map((link, index) => {
                            return(
                                <li key={index}>
                                    <a className='nav-link' onClick={link?.onclick}>{link.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </header>
        </React.Fragment>
    );
}

export default Nav;
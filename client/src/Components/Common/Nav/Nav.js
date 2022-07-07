import React from 'react';
import './Nav.css';

const Nav = (props) => {
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
                href: "/home"
            },
            {
                name: "Calender",
                href: "/calender"
            },
            {
                name: "History",
                href: "/history"
            }, 
            {
                name: "Logout",
                onclick: () => logout()
            },
        ]
    }
    
    function logout() {
        window.location.href = "/";
    }
    
    return (
        <React.Fragment>
            <header className='nav-wrapper'>
                <aside>
                    <h3 className='nav-logo'></h3>
                    <h3 className='nav-header'>P E R I O D</h3>
                </aside>
                <ul className='nav-links'>
                    {
                        links.map((link, index) => {
                            return(
                                <li key={index}>
                                    <a className='nav-link' href={link?.href} onClick={link?.onclick}>{link.name}</a>
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
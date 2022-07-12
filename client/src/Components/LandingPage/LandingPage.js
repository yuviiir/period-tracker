import React, { useContext, useState } from 'react';
import './LandingPage.css';

import Nav from '../Common/Nav/Nav';
import { PeriodTrackerContext } from '../../Context/Context';
import { useNavigate } from 'react-router';
import { getAllEvents, login, postJournalEntry, signUp } from '../../Services/Services';
import Loader from '../Common/Loader/Loader'

const LandingPage = () => {
    const context = useContext(PeriodTrackerContext);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [formData, setFormData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [inLineError, setInLineError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function initialiseForm(type) {
        let data;
        if (type == 'Login') {
            data = {
                email: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Eg. john@gmail.com",
                    display: "Email address",
                    error: "Please enter a valid email address.",
                    validation: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
                password: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Enter your password",
                    display: "Password",
                    error: "Please enter a valid password.",
                    type: "password",
                    validation: /^.{8,}$/
                }
            }
            setFormData(data);
        }
        else {
            data = {
                email: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Eg. john@gmail.com",
                    display: "Email address",
                    error: "Please enter a valid email address.",
                    validation: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
                password: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Enter a password",
                    display: "Password",
                    error: "Please enter a valid password. (At least 1 upprcase, 1 lowercase, 1 number and 1 special character.",
                    type: "password",
                    validation: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
                }
            }
            setFormData(data);
        }
        return data;
    }
    
    function createArray(form) {
        const formArray = [];
        for (let key in form) {
            formArray.push({
                key: key,
                data: form[key]
          });
        }
        return formArray;
    }

    function setValue(value, key) {
        let formDataCopy = {...formData};
        formDataCopy[key].value = value;
        formDataCopy[key].isTouched = true;
        setFormData(formDataCopy);
        checkValidity();
    }

    function checkValidity() {
        setIsFormValid(true);
        for (let key in formData) {
            if (formData[key].value) {
                formData[key].isValid = formData[key].validation ? formData[key].validation.test(formData[key].value) : true;
            }
            else {
                formData[key].isValid = false;
            }
            if (!formData[key].isValid) {
                setIsFormValid(false);
            }
        }
    }

    function showPopup(type) {
        setInLineError(null);
        setPopupType(type);
        setIsShowPopup(!isShowPopup);
        initialiseForm(type);
    }
    
    function closePopup() {
        setInLineError(null);
        setIsShowPopup(!isShowPopup);
        setPopupType('');
    }

    
    let navigate = useNavigate();
    function routeChange(path) { 
        navigate(path);
    }
    
    const submit = (type) => {
        context.setEmail(formData.email.value);
        setIsLoading(true);
        if (type === 'Login') {
            login(formData.email.value, formData.password.value)
            .then(res => {
                    setInLineError(null);
                    setIsLoading(false);
                    context.setJwtToken(res.accessToken.jwtToken);
                    console.log(res.accessToken.jwtToken);
                    routeChange('/home');
            })
            .catch(err => {
                if (err.code === "UserNotConfirmedException")
                    setInLineError("Please verify your account by clicking the link sent to your email.");
                else if (err.code === "NotAuthorizedException")
                    setInLineError("Incorrct username or password.");
                else
                    setInLineError("Error. Please try again later.");
                setIsLoading(false);
            })
        }
        else {
                signUp(formData.email.value, formData.password.value)
                    .then(res => {
                        setPopupType("Login");
                        setIsLoading(false);
                    })
                    .catch(err => {
                        if (err.code === "UsernameExistsException")
                            setInLineError("The email entered already exists. Please log in.");
                        else
                            setInLineError("Error. Please try again later.");
                        setIsLoading(false);
                    })
        }   
    }
    
    const formArray = createArray(formData);
    
    return (
        <React.Fragment>
            {
                isLoading ?
                <Loader></Loader>
                :
                null
            }
            {
                isShowPopup ?
                    <section>
                        <section className="popup-overlay"></section>
                        <section className="popup">
                            <section className="popup-controls">
                                <button className="popup-close" onClick={() => closePopup(popupType)}>X</button>
                            </section>
                            <section className="popup-content">
                                <h2 className="popup-heading">{popupType}</h2>
                                {
                                    formArray.map((item, index) => {
                                        return (
                                            <section key={item.key}>
                                                <article className='popup-input'>
                                                    <p className='popup-input-label'>{item.data.display}</p>
                                                    <input className={!item.data.isValid && item.data.isTouched ? "popup-input-box popup-input-box-invalid" : "popup-input-box"} type={item?.data?.type} onKeyUp={(e) => setValue(e.target.value, item.key)}></input>
                                                    {
                                                        !item.data.isValid && item.data.isTouched ?
                                                            <section className='input-box-invalid-wrapper'>
                                                                <p className='input-box-invalid-msg'>{item.data.error}</p>
                                                            </section>
                                                        :
                                                            null
                                                    }
                                                </article>
                                            </section>
                                        )
                                    })
                                }
                                {
                                    inLineError ?
                                        <section className='inline-error'>
                                            <p className='inline-error-msg'>{inLineError}</p>
                                        </section>
                                    :
                                        null
                                }
                                <button className="popup-button" onClick={() => submit(popupType)} disabled={!isFormValid}>
                                    {popupType}
                                </button>
                            </section>
                        </section>
                    </section>

                :
                    null
            }
            <Nav indexPagePopup={showPopup}></Nav>
            <section className='landingpage-wrapper'>
                <section className='landingpage-content'>
                    <h1 className='landingpage-text'>WELCOME</h1>
                    <section className='landingpage-buttons'>
                        <button className='landingpage-button' onClick={() => showPopup('Login')}>Login</button>
                        <button className='landingpage-button' onClick={() => showPopup('Sign up')}>Sign up</button>
                    </section>
                </section>
            </section>
        </React.Fragment>
    );
}

export default LandingPage;
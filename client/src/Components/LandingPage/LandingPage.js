import React, { useContext, useState } from 'react';
import './LandingPage.css';

import Nav from '../Common/Nav/Nav';
import { PeriodTrackerContext } from '../../Context/Context';
import { useNavigate } from 'react-router';
import { login, signUp } from '../../Services/Services';
import Loader from '../Common/Loader/Loader'

const LandingPage = () => {
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [formData, setFormData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

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
                    error: "Please enter a valid email address",
                    validation: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
                password: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Enter your password",
                    display: "Password",
                    error: "Please enter a valid password",
                    type: "password",
                    validation: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                }
            }
            setFormData(data);
        }
        else {
            data = {
                firstName: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Eg. John",
                    display: "First name",
                    error: "Please enter a valid first name",
                    validation: /^[a-zA-Z ]{2,50}$/
                },
                lastName: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Eg. Smith",
                    display: "Last name",
                    error: "Please enter a valid last name",
                    validation: /^[a-zA-Z ]{2,50}$/
                },
                email: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Eg. john@gmail.com",
                    display: "Email address",
                    error: "Please enter a valid email address",
                    validation: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
                password: {
                    value: null,
                    isValid: false,
                    isTouched: false,
                    placeholder: "Enter your password",
                    display: "Password",
                    error: "Please enter a valid password",
                    type: "password",
                    validation: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
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
        setPopupType(type);
        setIsShowPopup(!isShowPopup);
        initialiseForm(type);
    }

    function closePopup() {
        setIsShowPopup(!isShowPopup);
        setPopupType('');
    }

    function submit(type) {
        
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
                                            <div key={item.key}>
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
                                            </div>
                                        )
                                    })
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
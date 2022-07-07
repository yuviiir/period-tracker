import React from 'react';
import './LandingPage.css';

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

    const formArray = createArray(formData);

    return (
        <React.Fragment>
            <section className='landingpage-wrapper'>
                Period Tracker - Landing Page
            </section>
        </React.Fragment>
    );
}

export default LandingPage;
import React, { useState, useEffect, useContext } from 'react';
import './EntryForm.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Light from './FlowIcons/light.png';
import Medium from './FlowIcons/medium.png';
import Heavy from './FlowIcons/heavy.png';
import Happy from './MoodIcons/happy.png';
import Neutral from './MoodIcons/neutral.png';
import Sad from './MoodIcons/sad.png';
import Excited from './MoodIcons/excited.png';
import Tired from './MoodIcons/tired.png';
import Annoyed from './MoodIcons/annoyed.png';
import Angry from './MoodIcons/angry.png';
import Worried from './MoodIcons/worried.png';
import Sick from './MoodIcons/sick.png';
import Cramps from './SymptomIcons/abdominal-cramps.png';
import Bloating from './SymptomIcons/bloating.png';
import Headache from './SymptomIcons/headache.png';
import BodyAches from './SymptomIcons/body-aches.png';
import TenderBreasts from './SymptomIcons/tender-breasts.png';
import Breakouts from './SymptomIcons/breakouts.png';
import Cravings from './SymptomIcons/food-cravings.png';
import MoodSwings from './SymptomIcons/mood-swings.png';
import Insomnia from './SymptomIcons/insomnia.png';
import { getAllJournalEntries, postJournalEntry, updateJournalEntry } from '../../../../Services/Services';
import { PeriodTrackerContext } from '../../../../Context/Context'
import Loader from '../../../Common/Loader/Loader';

const EntryForm = () => {
    const entry = {
        date: '',
        mood: "Neutral",
        symptoms: [],
        notes: '',
        periodDateType: 0,
        flowStrength: "Light"
    };
    const context = useContext(PeriodTrackerContext);
    const [dateSet, setDateSet] = useState(new Date());
    const [dayEntry, setDayEntry] = useState({});
    const [allEntries, setAllEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [popupText, setPopupText] = useState("");
    const [datesArr, setDatesArr] = useState([]);
    
    let dayFound = false;

    const onChange = (date) => {
        setDateSet(date)
        getDayEntry(date)
    }
    
    const togglePeriodInfo = () => {
        let tempObj = {...dayEntry};
        if ([1, 2, 3].includes(tempObj?.periodDateType))
            tempObj.periodDateType = 0;
        else
            tempObj.periodDateType = 1;
        setDayEntry(tempObj);
    }

    const periodDayClick = (day) => {
        let tempObj = {...dayEntry};
        tempObj.periodDateType = day
        setDayEntry(tempObj);
    }

    function periodFlowClick(flow) {
        let tempObj = {...dayEntry};
        tempObj.flowStrength = flow
        setDayEntry(tempObj);
    }

    function moodClick(mood) {
        let tempObj = {...dayEntry};
        tempObj.mood = mood;
        setDayEntry(tempObj);
    }

    function setNotes(text) {
        let tempObj = {...dayEntry};
        tempObj.notes = text;
        setDayEntry(tempObj);
    }

    function symptomClick(symptom) {
        let tempObj = {...dayEntry};
        if (tempObj.symptoms.includes(symptom)) {
            tempObj.symptoms.splice(tempObj.symptoms.indexOf(symptom), 1)
        }
        else {
            tempObj.symptoms.push(symptom)
        }
        setDayEntry(tempObj);
    }
    
    const flows = [
        {
            name: 'Light',
            img: Light
        }, 
        {
            name: 'Medium',
            img: Medium
        }, 
        {
            name: 'Heavy',
            img: Heavy
        }
    ]
    
    const moods = [
        {
            name: 'Happy',
            img: Happy
        },
        {
            name: 'Neutral',
            img: Neutral
        },
        {
            name: 'Sad',
            img: Sad
        },
        {
            name: 'Excited',
            img: Excited
        },
        {
            name: 'Tired',
            img: Tired
        },
        {
            name: 'Annoyed',
            img: Annoyed
        },
        {
            name: 'Angry',
            img: Angry
        },
        {
            name: 'Worried',
            img: Worried
        },
        {
            name: 'Sick',
            img: Sick
        },
    ]
    
    const symptoms = [
        {
            name: 'Cramps',
            img: Cramps
        },
        {
            name: 'Bloating',
            img: Bloating
        },
        {
            name: 'Headaches',
            img: Headache
        },
        {
            name: 'Body Aches',
            img: BodyAches
        },
        {
            name: 'Tender Breasts',
            img: TenderBreasts
        },
        {
            name: 'Breakouts',
            img: Breakouts
        },
        {
            name: 'Cravings',
            img: Cravings
        },
        {
            name: 'Mood Swings',
            img: MoodSwings
        },
        {
            name: 'Insomnia',
            img: Insomnia
        },
    ]


    const getDayEntry = (date) => {
        dayFound = false;
        let dateSelected = `${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() < 9 ? "0" : ""}${date.getDate()}`;
        allEntries?.map(entry => {
            let entryDate = entry.date.substring(0, 10);
            if (dateSelected === entryDate) {
                dayFound = true;
                if (entry.periodDateType !== 0)
                    togglePeriodInfo()
                setDayEntry(entry);
            }
        })
        if (!dayFound) {
            let tempObj = {...entry};
            tempObj.date = dateSelected
            setDayEntry(tempObj)
        }
    }

    const SaveEntry = () => {
        setIsLoading(true);
        if (dayEntry._id) {
            updateJournalEntry(dayEntry, context.jwtToken)
            .then(res => {
                getAllEntries();
                setIsLoading(false);
                setPopupText("Successfully updated! 😊")
                setIsShowPopup(true)
            })
            .catch(err => {
                setIsLoading(false);
                setPopupText("An error occurred. Please try again. 😒")
                setIsShowPopup(true)
                //error
            });
        }
        else {
            postJournalEntry(dayEntry, context.jwtToken)
            .then(res => {
                getAllEntries();
                setIsLoading(false);
                setPopupText("Successfully added! 😊")
                setIsShowPopup(true)
            })
            .catch(err => {
                setIsLoading(false);
                setPopupText("An error occurred. Please try again. 😒")
                setIsShowPopup(true)
                //error
            });
        }
    }

    function getAllEntries() {
        setIsLoading(true);
        getAllJournalEntries(context.jwtToken)
        .then(res => {
            setAllEntries(res);
            setIsLoading(false);
        })
        .catch(err => {
            setIsLoading(false);
            setPopupText("An error occurred fetching your journal. Please try again later. 🤦‍♀️")
            setIsShowPopup(true)
            //error
        });
    }
    
    useEffect(() => {
        setDateSet(new Date())
        getAllEntries();
    }, []);

    
    useEffect(() => {
        getDayEntry(dateSet);
        let datesArrTemp = [];
        allEntries.map(entry => {
            let date = new Date(entry.date);
            datesArrTemp.push(`${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() < 9 ? "0" : ""}${date.getDate()}`);
        })
        setDatesArr(datesArrTemp)
    }, [allEntries]);

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
                        <section className="journal-popup-overlay"></section>
                        <section className="journal-popup">
                            <section className="journal-popup-controls">
                                <button className="journal-popup-close" onClick={() => setIsShowPopup(!isShowPopup)}>X</button>
                            </section>
                            <section className="journal-popup-content">
                                <h2 className="journal-popup-heading">{popupText}</h2>

                                <button className="journal-popup-button" onClick={() => setIsShowPopup(!isShowPopup)}>
                                    Cool
                                </button>
                            </section>
                        </section>
                    </section>

                :
                    null
            }
            <section className='entry-form-wrapper'>
                <section id='col-1'>
                    <section id='calendar' className='form-info'>
                        <h1>Calendar</h1>
                        <Calendar 
                            value={dateSet} 
                            onChange={onChange}
                            tileClassName={({ date, view }) => {
                                if(datesArr?.includes((`${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${date.getMonth() + 1}-${date.getDate() < 9 ? "0" : ""}${date.getDate()}`))){
                                    return  'highlight'
                                }
                            }}
                            maxDate={new Date()}
                        />
                    </section>

                    
                        <section id='period-info' className='form-info'>
                        <h1>Period Information
                            <input type="checkbox" id='period-checkbox' checked={[1, 2, 3].includes(dayEntry?.periodDateType)} onChange={togglePeriodInfo}/>
                        </h1>
                        
                        { [1, 2, 3].includes(dayEntry?.periodDateType) ?   
                            <article>
                            <p className='form-desc'>What day of your period was it?</p>
                            <fieldset id="period-day">
                                <input type="radio" id='start' value="start" name="period-day" checked={dayEntry?.periodDateType === 1} onChange={() => periodDayClick(1)}/>
                                <label htmlFor="start">Start day</label>
                                <input type="radio" id='end' value="end" name="period-day" checked={dayEntry?.periodDateType === 2} onChange={() => periodDayClick(2)}/>
                                <label htmlFor="end">End day</label>
                                <input type="radio" id='normal' value="normal" name="period-day" checked={dayEntry?.periodDateType === 3} onChange={() => periodDayClick(3)}/>
                                <label htmlFor="normal">Just another day</label>
                            </fieldset>

                            <p className='form-desc'>What was your flow like?</p>
                            {
                                flows.map((flow, index) => {
                                    return(
                                        <article key={index} className={dayEntry?.flowStrength === flow.name ? 'flow selected-flow' : 'flow'} id={flow.name} onClick={() => periodFlowClick(flow.name)}>
                                            <span>
                                            <img alt='period icon' src={flow.img}></img>
                                            <p>{flow.name}</p>
                                            </span>
                                        </article>
                                    )
                                })
                            }
                            </article>
                        :
                            <article>
                                <p className='form-desc'>Check the box if it was a period day 💕</p>
                                <img className='period-pic' src='https://thumbs.dreamstime.com/b/flat-woman-mark-date-menstruation-period-menstrual-calendar-young-periods-cycle-control-pregnancy-planning-pms-tracker-245630370.jpg'/>
                            </article>
                        }
                    </section>

                    <section id='moods' className='form-info'>
                        <h1>Mood</h1>
                        <p className='form-desc'>How did you feel?</p>
                        {
                            moods.map((mood, index) => {
                                return(
                                    <article key={index} className={dayEntry?.mood === mood.name ? 'mood selected-mood' : 'mood'} id={mood.name} onClick={() => moodClick(mood.name)}>
                                        <span>
                                        <img alt='period icon' src={mood.img}></img>
                                        <p>{mood.name}</p>
                                        </span>
                                    </article>
                                )
                            })
                        }
                    </section>
                </section>

                <section id='col-2'>
                    <section id='symptoms' className='form-info'>
                        <h1>Symptoms</h1>
                        <p className='form-desc'>What did you experience?</p>
                        {
                            symptoms.map((symptom, index) => {
                                return(
                                    <article key={index} className={dayEntry?.symptoms?.includes(symptom.name) ? 'symptom selected-symptom' : 'symptom'} id={symptom.name} onClick={() => symptomClick(symptom.name)}>
                                        <span>
                                        <img alt='period icon' src={symptom.img}></img>
                                        <p>{symptom.name}</p>
                                        </span>
                                    </article>
                                )
                            })
                        }
                    </section>

                    <section id='notes' className='form-info'>
                        <h1>Notes</h1>
                        <p className='form-desc'>Take some time to reflect and look back on your day.</p>
                        <textarea placeholder='Give us the tea sis ☕' value={dayEntry?.notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                    </section>



                </section>
            </section>
            <section id='buttons'>
                <button className="journal-button" onClick={SaveEntry}>Save</button>
            </section>

        </React.Fragment>
    );
}

export default EntryForm;
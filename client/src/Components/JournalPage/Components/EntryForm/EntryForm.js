import React, { useState, useEffect, StrictMode } from 'react';
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

let entry = {
    date: '',
    periodInfo: {
        period: true,
        periodDay: 'end',
        flow: 'Heavy',
    },
    moods: ['Happy', 'Tired'],
    symptoms: ['Cramps', 'Mood Swings', 'Cravings'],
    notes: 'I want sushi'
}

const EntryForm = () => {
    const [value, SetValue] = useState(new Date());
    const [isShowPeriodInfo, setIsShowPeriodInfo] = useState(false);
    const [dayEntry, setDayEntry] = useState({})

    const OnChange = (date) => {
        SetValue(date)
        GetDayEntry(date)
    }

    const TogglePeriodInfo = () => {
        let tempObj = {...dayEntry};
        tempObj.periodInfo.period = !tempObj.periodInfo.period
        if (!tempObj.periodInfo.period) {
            tempObj.periodInfo.periodDay = ''
            tempObj.periodInfo.flow = ''
        }
        setDayEntry(tempObj);
    }

    const periodDayClick = (day) => {
        let tempObj = {...dayEntry};
        tempObj.periodInfo.periodDay = day
        setDayEntry(tempObj);
    }

    function periodFlowClick(flow) {
        let tempObj = {...dayEntry};
        tempObj.periodInfo.flow = flow
        setDayEntry(tempObj);
    }

    function moodClick(mood) {
        let tempObj = {...dayEntry};
        if (tempObj.moods.includes(mood)) {
            tempObj.moods.splice(tempObj.moods.indexOf(mood), 1)
        }
        else {
            tempObj.moods.push(mood)
        }
        setDayEntry(tempObj);
    }

    function symptomClick(symptom) {
        let tempObj = {...dayEntry};
        if (tempObj.symptoms.includes(symptom)) {
            tempObj.symptoms.splice(tempObj.symptom.indexOf(symptom), 1)
        }
        else {
            tempObj.symptoms.push(symptom)
        }
        setDayEntry(tempObj);
    }

    const PopulateData = (entry) => {
        setDayEntry(entry)
    }

    // get entry data from api
    const GetDayEntry = (date) => {
        console.log(date)
    }

    // post entry data to api
    const SaveEntry = () => {
        console.log(dayEntry)
    }

    // cancel changes made to entry
    const CancelEntry = () => {

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

    useEffect(() => {
        // call api or anything
        PopulateData(entry)
        console.log("loaded");
     });

    return (
        <React.Fragment>
            <section className='entry-form-wrapper'>
                <section id='col-1'>
                    <section id='calendar' className='form-info'>
                        <h1>Calendar</h1>
                        <Calendar value={value} onChange={OnChange}/>
                    </section>

                    
                        <section id='period-info' className='form-info'>
                        <h1>Period Information
                            <input type="checkbox" id='period-checkbox' checked={dayEntry?.periodInfo?.period} onChange={TogglePeriodInfo}/>
                        </h1>
                        
                        { dayEntry?.periodInfo?.period ?   
                            <article>
                            <p className='form-desc'>What day of your period was it?</p>
                            <fieldset id="period-day">
                                <input type="radio" id='start' value="start" name="period-day" checked={dayEntry?.periodInfo?.periodDay == 'start'} onChange={() => periodDayClick('start')}/>
                                <label for="start">Start day</label>
                                <input type="radio" id='end' value="end" name="period-day" checked={dayEntry?.periodInfo?.periodDay == 'end'} onChange={() => periodDayClick('end')}/>
                                <label for="end">End day</label>
                                <input type="radio" id='normal' value="normal" name="period-day" checked={dayEntry?.periodInfo?.periodDay == 'normal'} onChange={() => periodDayClick('normal')}/>
                                <label for="normal">Just another day</label>
                            </fieldset>

                            <p className='form-desc'>What was your flow like?</p>
                            {
                                flows.map((flow) => {
                                    return(
                                        <article className={dayEntry?.periodInfo?.flow == flow.name ? 'flow selected-flow' : 'flow'} id={flow.name} onClick={() => periodFlowClick(flow.name)}>
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
                        <h1>Moods</h1>
                        <p className='form-desc'>How did you feel?</p>
                        {
                            moods.map((mood) => {
                                return(
                                    <article className={dayEntry?.moods?.includes(mood.name) ? 'mood selected-mood' : 'mood'} id={mood.name} onClick={() => moodClick(mood.name)}>
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
                            symptoms.map((symptom) => {
                                return(
                                    <article className={dayEntry?.symptoms?.includes(symptom.name) ? 'symptom selected-symptom' : 'symptom'} id={symptom.name} onClick={() => symptomClick(symptom.name)}>
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
                        <textarea placeholder='Give us the tea sis ☕'></textarea>
                    </section>

                    <section id='buttons'>
                        <button onClick={SaveEntry}>Save</button>
                        <button onClick={CancelEntry}>Cancel</button>
                    </section>


                </section>
            </section>

        </React.Fragment>
    );
}

export default EntryForm;
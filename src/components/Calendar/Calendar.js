import React, { useState } from 'react';
import './Calendar.css'
import Calendar from 'react-calendar'


const CalendarComponent = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className='calendar'>
       <Calendar onChange={onChange}
       value={value}
       className='react-calendar' />
        </div>
    )
}

export default CalendarComponent

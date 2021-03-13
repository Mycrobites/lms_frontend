import React from 'react'
import CalendarComponent from '../../components/Calendar/Calendar'
import Courses from '../../components/Courses/Courses'
import LeaderBoard from '../../components/LeaderBoard/LeaderBoard'
import UpcomingLessons from '../../components/UpcomingLessons/UpcomingLessons'

import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <UpcomingLessons/>
            <LeaderBoard/>
            <Courses/>
            <CalendarComponent />
            
        </div>
    )
}

export default Home

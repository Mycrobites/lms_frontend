import React from 'react'
import Courses from "../../components/Courses/Courses.jsx";
import LeaderBoard from "../../components/LeaderBoard/LeaderBoard.jsx";
import UpcomingLessons from "../../components/UpcomingLessons/UpcomingLessons.jsx";
import './DashBoard.css'

const DashBoard = () => {
    return (
        <div className="Dashboard">
            <div>
                <UpcomingLessons />
            </div>
        </div>
    )
}

export default DashBoard

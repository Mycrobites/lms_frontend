import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import './Enrollment.css'

const Enrollment = () => {
    return (
        <div>
        <NavBar/>
            <SideBar active={"enrollment"}/>
        </div>
    )
}

export default Enrollment

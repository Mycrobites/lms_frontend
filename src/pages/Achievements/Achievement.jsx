import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import './Achievement.css'

const Achievement = () => {
    return (
        <div>
            <NavBar/>
            <SideBar active={"achievement"}/>
        </div>
    )
}

export default Achievement

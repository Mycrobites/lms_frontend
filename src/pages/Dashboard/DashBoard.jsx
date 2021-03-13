import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import './DashBoard.css'

const DashBoard = () => {
    return (
        <div>
        <NavBar/>
            <SideBar active={"dashboard"}/>
        </div>
    )
}

export default DashBoard

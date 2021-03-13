import React from 'react'
import Calendar from '../../components/Calendar/Calendar'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import './Home.css'

const Home = () => {
    return (
        <div>
           <NavBar/>
           <SideBar active={"home"}/>
           <Calendar/>
        </div>
    )
}

export default Home

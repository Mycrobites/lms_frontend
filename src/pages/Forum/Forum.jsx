import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import SideBar from '../../components/SideBar/SideBar'
import './Forum.css'

const Forum = () => {
    return (
        <div>
        <NavBar/>
            <SideBar active={"forum"}/>
        </div>
    )
}

export default Forum

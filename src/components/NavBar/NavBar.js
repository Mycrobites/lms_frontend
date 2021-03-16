import React,{useState} from 'react'
import Avatar from "@material-ui/core/Avatar";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import logo from "../../assets/images/Artboard 1.png";
import "./NavBar.css";
import UserDetail from "./userDetail";
import Notification from './Notification';

const NavBar = () => {

  const[showUser,setShowUser] =useState(false)
  const[showNotification,setShowNotification] =useState(false)
 
  const showNotBar = e => {
    setShowNotification(!showNotification) 
    setShowUser(!showUser)
  }
  const showUserBar = e => {
    setShowNotification(!showNotification)
     setShowUser(!showUser)
    }

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="user">
        <button id="notification" onClick={showNotBar}>
          <span>1</span>
          <NotificationsOutlinedIcon />
        </button>
        <h4 id="user-name">Brad Stevens</h4>
        <Avatar src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg" />
        <button onClick={showUserBar}>
          {showUser ? <ExpandLessOutlinedIcon/> : <KeyboardArrowDownIcon /> }
          
        </button>
        {showUser && <UserDetail name={"Brad Stevens"}/>}
        {showNotification && <Notification/>}
      
        
        
      </div>
    </div>
  );
};

export default NavBar;

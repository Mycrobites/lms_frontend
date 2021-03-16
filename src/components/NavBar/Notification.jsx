import React from 'react'
import './NavBar.css'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const Notification = () => {
    return (
        <div className='user-notification'>
        <div className='notification-header'>
         <h4>Notifications</h4>
         <button><CloseOutlinedIcon/></button>
         
        </div>
        <div className='notification-body'>



        </div>
            
        </div>
    )
}

export default Notification

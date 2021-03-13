import Avatar from '@material-ui/core/Avatar';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import logo from '../../assets/images/Artboard 1.png'
import './NavBar.css'

const NavBar = () => {
    return (
        <div className='navbar'>
            <div className='logo'>
            <img src={logo} alt="logo"/>
            </div>
            <div className='user'>
            
            <button id="notification"><span>1</span><NotificationsOutlinedIcon/></button>
            
            <h4 id='user-name'>react dashboard</h4>
            <Avatar/>
            <button><KeyboardArrowDownIcon/></button>
            
            
            
            </div>

        </div>
    )
}

export default NavBar
